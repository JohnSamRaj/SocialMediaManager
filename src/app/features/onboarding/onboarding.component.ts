import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface OnboardingStep {
  title: string;
  description: string;
  image: string;
  actions: {
    primary: string;
    secondary?: string;
  };
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  currentStep = 0;
  showOnboarding = true;
  
  steps: OnboardingStep[] = [
    {
      title: 'Welcome to Social Manager!',
      description: 'Your all-in-one platform for managing Instagram content. We\'ll guide you through the main features to help you get started quickly.',
      image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24',
      actions: {
        primary: 'Next',
        secondary: 'Skip Tour'
      }
    },
    {
      title: 'Dashboard Overview',
      description: 'Your dashboard provides a quick overview of your Instagram performance, upcoming posts, and content drafts. Check your engagement rates and follower growth at a glance.',
      image: 'https://images.unsplash.com/photo-1555155592-490a1ba16284',
      actions: {
        primary: 'Next',
        secondary: 'Skip Tour'
      }
    },
    {
      title: 'Create and Schedule Content',
      description: 'Create new posts with our easy-to-use editor. Upload media, write captions, add hashtags, and schedule your content for the perfect posting time.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      actions: {
        primary: 'Next',
        secondary: 'Skip Tour'
      }
    },
    {
      title: 'AI-Powered Content Creation',
      description: 'Let our AI help you generate engaging captions and relevant hashtags based on your media content, saving you time and boosting your engagement.',
      image: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be',
      actions: {
        primary: 'Next',
        secondary: 'Skip Tour'
      }
    },
    {
      title: 'Analyze Your Performance',
      description: 'Dive deep into your analytics to understand what content performs best. Track engagement rates, follower growth, and audience demographics to refine your strategy.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      actions: {
        primary: 'Next',
        secondary: 'Skip Tour'
      }
    },
    {
      title: 'Content Calendar',
      description: 'Visualize your content schedule with our calendar view. See what\'s coming up, manage scheduled posts, and ensure a consistent posting schedule.',
      image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4',
      actions: {
        primary: 'Get Started',
      }
    }
  ];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('completedOnboarding');
    if (hasCompletedOnboarding === 'true') {
      this.showOnboarding = false;
    }
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.completeOnboarding();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  skipTour(): void {
    this.completeOnboarding();
  }

  completeOnboarding(): void {
    localStorage.setItem('completedOnboarding', 'true');
    this.router.navigate(['/dashboard']);
  }
  
  restartTour(): void {
    this.currentStep = 0;
    this.showOnboarding = true;
  }
  
  navigateToFeature(feature: string): void {
    switch (feature) {
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'content-creation':
        this.router.navigate(['/content-creation']);
        break;
      case 'analytics':
        this.router.navigate(['/analytics']);
        break;
      case 'schedule':
        this.router.navigate(['/schedule']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }
}
