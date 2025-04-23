import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  showArrow?: boolean;
  showButtons?: boolean;
  highlightTarget?: boolean;
  customClass?: string;
}

export interface TourConfig {
  name: string;
  steps: TourStep[];
  showOverlay: boolean;
  showCloseButton: boolean;
  keyboardNavigation: boolean;
  onComplete?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private currentTourSubject = new BehaviorSubject<TourConfig | null>(null);
  public currentTour$ = this.currentTourSubject.asObservable();

  private currentStepSubject = new BehaviorSubject<number>(0);
  public currentStep$ = this.currentStepSubject.asObservable();

  private activeTourSubject = new BehaviorSubject<boolean>(false);
  public activeTour$ = this.activeTourSubject.asObservable();

  constructor() {
    // The tour will be started from the dashboard component when the user logs in
  }
  
  /**
   * Checks if the user has completed the tour
   * @returns boolean indicating if user has completed the tour
   */
  hasCompletedTour(): boolean {
    return localStorage.getItem('tour_completed') === 'true';
  }

  startFirstTimeTour(): void {
    const tour: TourConfig = {
      name: 'welcome-tour',
      steps: [
        {
          target: 'body',
          title: 'Welcome to Social Media Manager!',
          content: 'This quick tour will help you get familiar with the main features of our app.',
          position: 'top',
          showArrow: false,
          highlightTarget: false,
          customClass: 'welcome-step'
        },
        {
          target: '.dashboard-overview',
          title: 'Dashboard Overview',
          content: 'Here you can see a summary of your social media performance and recent posts.',
          position: 'bottom',
          highlightTarget: true
        },
        {
          target: '.sidebar-nav-item.schedule',
          title: 'Schedule Posts',
          content: 'Plan your content ahead of time by scheduling posts for the future.',
          position: 'right',
          highlightTarget: true
        },
        {
          target: '.sidebar-nav-item.create',
          title: 'Create Content',
          content: 'Create and design new social media posts with AI-assisted caption and hashtag generation.',
          position: 'right',
          highlightTarget: true
        },
        {
          target: '.sidebar-nav-item.analytics',
          title: 'Analytics',
          content: 'View detailed performance metrics and insights about your social media accounts.',
          position: 'right',
          highlightTarget: true
        },
        {
          target: 'body',
          title: 'You\'re All Set!',
          content: 'Thanks for taking the tour. We\'re excited to have you on board! Start exploring and let us help you grow your social media presence.',
          position: 'top',
          showArrow: false,
          highlightTarget: false,
          customClass: 'finish-step'
        }
      ],
      showOverlay: true,
      showCloseButton: true,
      keyboardNavigation: true,
      onComplete: () => {
        localStorage.setItem('tour_completed', 'true');
      }
    };

    this.startTour(tour);
  }

  startCustomTour(tour: TourConfig): void {
    this.startTour(tour);
  }

  private startTour(tour: TourConfig): void {
    this.currentTourSubject.next(tour);
    this.currentStepSubject.next(0);
    this.activeTourSubject.next(true);
  }

  nextStep(): void {
    const currentStep = this.currentStepSubject.value;
    const tour = this.currentTourSubject.value;
    
    if (!tour) return;
    
    if (currentStep < tour.steps.length - 1) {
      this.currentStepSubject.next(currentStep + 1);
    } else {
      this.endTour();
    }
  }

  previousStep(): void {
    const currentStep = this.currentStepSubject.value;
    
    if (currentStep > 0) {
      this.currentStepSubject.next(currentStep - 1);
    }
  }

  goToStep(stepIndex: number): void {
    const tour = this.currentTourSubject.value;
    
    if (!tour) return;
    
    if (stepIndex >= 0 && stepIndex < tour.steps.length) {
      this.currentStepSubject.next(stepIndex);
    }
  }

  endTour(): void {
    const tour = this.currentTourSubject.value;
    
    if (tour?.onComplete) {
      tour.onComplete();
    }
    
    this.activeTourSubject.next(false);
    this.currentTourSubject.next(null);
  }
}