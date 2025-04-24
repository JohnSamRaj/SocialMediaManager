import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OnboardingStep {
  title: string;
  content: string;
  image?: string;
  isConnectionStep?: boolean;
  platforms?: {
    id: string;
    name: string;
    icon: string;
    connectable: boolean;
  }[];
  requirements?: string[];
}

@Component({
  selector: 'app-onboarding-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding-modal.component.html',
  styleUrls: ['./onboarding-modal.component.css']
})
export class OnboardingModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  
  isVisible = false;
  currentStep = 0;
  
  steps: OnboardingStep[] = [
    {
      title: 'Welcome to Social Media Manager',
      content: 'Your all-in-one platform for managing social media accounts across multiple platforms. Let\'s take a quick tour to get you started.',
      image: 'assets/images/onboarding/welcome.svg'
    },
    {
      title: 'Connect Your Accounts',
      content: 'First, let\'s connect your social media accounts to get started. Select which platforms you want to manage.',
      image: 'assets/images/onboarding/platforms.svg',
      isConnectionStep: true,
      platforms: [
        {
          id: 'instagram',
          name: 'Instagram',
          icon: 'fab fa-instagram',
          connectable: true
        },
        {
          id: 'facebook',
          name: 'Facebook',
          icon: 'fab fa-facebook',
          connectable: false
        },
        {
          id: 'twitter',
          name: 'Twitter',
          icon: 'fab fa-twitter',
          connectable: false
        },
        {
          id: 'linkedin',
          name: 'LinkedIn',
          icon: 'fab fa-linkedin',
          connectable: false
        }
      ]
    },
    {
      title: 'Instagram Requirements',
      content: 'To connect your Instagram account, please make sure you meet the following requirements:',
      requirements: [
        'Your Instagram account must be a Business or Creator account',
        'Your Instagram account must be connected to a Facebook page',
        'You must have admin access to the Facebook page connected to your Instagram account',
        'Your Instagram account must comply with Meta\'s Platform Terms'
      ]
    },
    {
      title: 'Create & Schedule Content',
      content: 'Easily create, schedule, and publish content to your social media accounts. Our AI-powered tools help you create engaging captions and hashtags.',
      image: 'assets/images/onboarding/content.svg'
    },
    {
      title: 'Track Performance',
      content: 'Monitor your account growth, engagement metrics, and content performance all in one place with our powerful analytics dashboard.',
      image: 'assets/images/onboarding/analytics.svg'
    },
    {
      title: 'Let\'s Get Started!',
      content: 'You\'re all set to start managing your social media presence like a pro. Click "Finish" to begin your journey.',
      image: 'assets/images/onboarding/finish.svg'
    }
  ];
  
  /**
   * Show the onboarding modal
   */
  show(): void {
    this.isVisible = true;
    this.currentStep = 0;
    document.body.classList.add('no-scroll');
  }
  
  /**
   * Hide the onboarding modal
   */
  hide(): void {
    this.isVisible = false;
    document.body.classList.remove('no-scroll');
    this.closeModal.emit();
  }
  
  /**
   * Go to the next step in the onboarding process
   */
  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.hide();
    }
  }
  
  /**
   * Go to the previous step in the onboarding process
   */
  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
  
  /**
   * Skip onboarding and close the modal
   */
  skipOnboarding(): void {
    // Set localStorage flag to remember that onboarding is complete
    localStorage.setItem('hasCompletedOnboarding', 'true');
    this.hide();
  }
}