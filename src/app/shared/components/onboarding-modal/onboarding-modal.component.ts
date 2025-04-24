import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OnboardingStep {
  title: string;
  content: string;
  image?: string;
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
      title: 'Connect Multiple Platforms',
      content: 'Add and manage accounts from different social media platforms including Instagram, Facebook, Twitter, LinkedIn, and more.',
      image: 'assets/images/onboarding/platforms.svg'
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