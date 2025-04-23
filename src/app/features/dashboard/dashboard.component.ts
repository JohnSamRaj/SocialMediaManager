import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InstagramService } from '../../core/services/instagram.service';
import { AuthService } from '../../core/auth/auth.service';
import { TourService } from '../../core/services/tour.service';
import { Post, PostStatus } from '../../core/models/post.model';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { ChartComponent } from '../../shared/components/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostCardComponent,
    ChartComponent
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

  ngOnInit(): void {
    this.loadDashboardData();
    
    // Start the tour for first-time users after a slight delay to ensure elements are loaded
    setTimeout(() => {
      if (!this.tourService.hasCompletedTour()) {
        this.tourService.startFirstTimeTour();
      }
    }, 1500);
  }

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
              borderColor: '#f79ed8',
              backgroundColor: 'rgba(247, 158, 216, 0.2)',
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
              backgroundColor: '#8c5c7b',
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
}
