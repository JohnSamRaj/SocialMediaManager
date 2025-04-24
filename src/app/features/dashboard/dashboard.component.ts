import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InstagramService } from '../../core/services/instagram.service';
import { AuthService } from '../../core/auth/auth.service';
import { TourService } from '../../core/services/tour.service';
import { Post, PostStatus } from '../../core/models/post.model';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { OnboardingModalComponent } from '../../shared/components/onboarding-modal/onboarding-modal.component';
import { AddPlatformModalComponent } from '../../shared/components/add-platform-modal/add-platform-modal.component';
// import { ChartComponent } from '../../shared/components/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostCardComponent,
    OnboardingModalComponent,
    AddPlatformModalComponent,
    // ChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  recentPosts: Post[] = [];
  draftPosts: Post[] = [];
  scheduledPosts: Post[] = [];

  engagementData: any = {};
  growthData: any = {};

  isLoading = true;
  error: string | null = null;
  hasConnectedAccounts = false; // Flag to determine if user has connected social media accounts

  // References to modal components
  @ViewChild(OnboardingModalComponent) onboardingModal!: OnboardingModalComponent;
  @ViewChild(AddPlatformModalComponent) addPlatformModal!: AddPlatformModalComponent;

  // For enum access in template
  PostStatus = PostStatus;

  constructor(
    private instagramService: InstagramService,
    public authService: AuthService,
    private tourService: TourService
  ) { }

  // Helper methods for the template
  getScheduledPostsCount(): number {
    return this.posts.filter(post => post.status === PostStatus.SCHEDULED).length;
  }

  getDraftPostsCount(): number {
    return this.posts.filter(post => post.status === PostStatus.DRAFT).length;
  }

  getPublishedPostsCount(): number {
    return this.posts.filter(post => post.status === PostStatus.PUBLISHED).length;
  }

  // ngOnInit moved to the bottom of the class

  loadDashboardData(): void {
    this.isLoading = true;

    // Load posts
    this.instagramService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.recentPosts = posts
          .filter(post => post.status === PostStatus.PUBLISHED)
          .sort((a, b) => 
            (new Date(b.publishedAt || 0)).getTime() - 
            (new Date(a.publishedAt || 0)).getTime()
          )
          .slice(0, 4);

        this.draftPosts = posts
          .filter(post => post.status === PostStatus.DRAFT)
          .slice(0, 3);

        this.scheduledPosts = posts
          .filter(post => post.status === PostStatus.SCHEDULED)
          .sort((a, b) => 
            (new Date(a.scheduledFor || 0)).getTime() - 
            (new Date(b.scheduledFor || 0)).getTime()
          )
          .slice(0, 3);

        this.loadAnalytics();
      },
      error: (err) => {
        this.error = 'Failed to load posts. Please try again.';
        this.isLoading = false;
        console.error('Error loading posts:', err);
      }
    });
  }

  loadAnalytics(): void {
    this.instagramService.getInstagramInsights().subscribe({
      next: (analytics) => {
        // Prepare engagement data for chart
        const dates = analytics.engagementMetrics.slice(-14).map((metric: any) => 
          new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        );

        const engagementRates = analytics.engagementMetrics.slice(-14).map((metric: any) => 
          metric.engagementRate.toFixed(2)
        );

        this.engagementData = {
          labels: dates,
          datasets: [
            {
              label: 'Engagement Rate (%)',
              data: engagementRates,
              borderColor: '#FF6701',
              backgroundColor: '#FFC288',
              tension: 0.4,
              fill: true
            }
          ]
        };

        // Prepare followers growth data
        const growthDates = analytics.accountGrowth.slice(-7).map((growth: any) => 
          new Date(growth.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        );

        const followersCount = analytics.accountGrowth.slice(-7).map((growth: any) => 
          growth.followers
        );

        this.growthData = {
          labels: growthDates,
          datasets: [
            {
              label: 'Followers',
              data: followersCount,
              backgroundColor: '#FFC288',
              borderRadius: 6
            }
          ]
        };

        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load analytics. Please try again.';
        this.isLoading = false;
        console.error('Error loading analytics:', err);
      }
    });
  }

  handleEdit(post: Post): void {
    // Navigate to edit post
    window.location.href = `/content-creation?id=${post.id}`;
  }

  handleDelete(post: Post): void {
    this.instagramService.deletePost(post.id).subscribe({
      next: (success) => {
        if (success) {
          this.loadDashboardData();
        }
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }

  handlePublish(post: Post): void {
    this.instagramService.publishPost(post.id).subscribe({
      next: (updatedPost) => {
        this.loadDashboardData();
      },
      error: (err) => {
        console.error('Error publishing post:', err);
      }
    });
  }

  handleSchedule(data: { post: Post, date: Date }): void {
    this.instagramService.schedulePost(data.post.id, data.date).subscribe({
      next: (updatedPost) => {
        this.loadDashboardData();
      },
      error: (err) => {
        console.error('Error scheduling post:', err);
      }
    });
  }

  /**
   * Opens the onboarding modal
   */
  openOnboardingModal(): void {
    if (this.onboardingModal) {
      this.onboardingModal.show();
    }
  }

  /**
   * Opens the add platform modal for a specific platform
   * @param platformId The ID of the platform to connect
   */
  openConnectAccountModal(platformId: string): void {
    if (this.addPlatformModal) {
      this.addPlatformModal.show(platformId);
    }
  }

  /**
   * Check if the user has connected accounts and
   * Update the hasConnectedAccounts flag accordingly
   */
  checkConnectedAccounts(): void {
    // For demo purposes, we're hardcoding this to false
    // In a real implementation, this would check with a service
    this.hasConnectedAccounts = false;
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.checkConnectedAccounts();

    // Start the tour for first-time users after a slight delay to ensure elements are loaded
    setTimeout(() => {
      if (!this.tourService.hasCompletedTour()) {
        this.tourService.startFirstTimeTour();
      }
    }, 1500);
  }
}
