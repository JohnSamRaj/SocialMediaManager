import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TourService, TourStep } from '../../../core/services/tour.service';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit, OnDestroy {
  currentStep: number = 0;
  isActive: boolean = false;
  steps: TourStep[] = [];
  activeStep: TourStep | null = null;
  
  private subscriptions = new Subscription();
  private _targetElement: HTMLElement | null = null;
  private _stepElement: HTMLElement | null = null;
  
  constructor(private tourService: TourService) {}
  
  ngOnInit(): void {
    // Subscribe to tour changes
    this.subscriptions.add(
      this.tourService.currentTour$.subscribe(tour => {
        if (tour) {
          this.steps = tour.steps;
        } else {
          this.steps = [];
        }
      })
    );
    
    // Subscribe to step changes
    this.subscriptions.add(
      this.tourService.currentStep$.subscribe(stepIndex => {
        this.currentStep = stepIndex;
        this.activeStep = this.steps[stepIndex];
        
        if (this.activeStep) {
          setTimeout(() => {
            this.positionStep();
          }, 100);
        }
      })
    );
    
    // Subscribe to tour active state
    this.subscriptions.add(
      this.tourService.activeTour$.subscribe(isActive => {
        this.isActive = isActive;
        
        if (isActive) {
          document.body.classList.add('tour-active');
        } else {
          document.body.classList.remove('tour-active');
        }
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    document.body.classList.remove('tour-active');
  }
  
  nextStep(): void {
    this.tourService.nextStep();
  }
  
  previousStep(): void {
    this.tourService.previousStep();
  }
  
  closeStep(): void {
    this.tourService.endTour();
  }
  
  private getTargetElement(): HTMLElement | null {
    if (!this.activeStep) return null;
    
    const targetSelector = this.activeStep.target;
    
    if (targetSelector === 'body') {
      return document.body;
    }
    
    return document.querySelector(targetSelector);
  }
  
  private getStepElement(): HTMLElement | null {
    return document.querySelector('.tour-step');
  }
  
  private positionStep(): void {
    if (!this.activeStep) return;
    
    this._targetElement = this.getTargetElement();
    this._stepElement = this.getStepElement();
    
    if (!this._targetElement || !this._stepElement) return;
    
    const targetRect = this._targetElement.getBoundingClientRect();
    const stepRect = this._stepElement.getBoundingClientRect();
    
    // Reset position classes
    this._stepElement.classList.remove('top', 'bottom', 'left', 'right');
    this._stepElement.classList.add(this.activeStep.position);
    
    // Calculate position
    let top = 0;
    let left = 0;
    
    switch (this.activeStep.position) {
      case 'top':
        top = targetRect.top - stepRect.height - 10;
        left = targetRect.left + targetRect.width / 2 - stepRect.width / 2;
        break;
      case 'bottom':
        top = targetRect.bottom + 10;
        left = targetRect.left + targetRect.width / 2 - stepRect.width / 2;
        break;
      case 'left':
        top = targetRect.top + targetRect.height / 2 - stepRect.height / 2;
        left = targetRect.left - stepRect.width - 10;
        break;
      case 'right':
        top = targetRect.top + targetRect.height / 2 - stepRect.height / 2;
        left = targetRect.right + 10;
        break;
    }
    
    // Apply position
    this._stepElement.style.top = `${Math.max(10, top)}px`;
    this._stepElement.style.left = `${Math.max(10, left)}px`;
    
    // Position highlight if needed
    if (this.activeStep.highlightTarget && this._targetElement !== document.body) {
      const highlight = document.querySelector('.tour-highlight');
      if (highlight) {
        highlight.setAttribute('style', `
          top: ${targetRect.top - 5}px;
          left: ${targetRect.left - 5}px;
          width: ${targetRect.width + 10}px;
          height: ${targetRect.height + 10}px;
          opacity: 1;
        `);
      }
    } else {
      const highlight = document.querySelector('.tour-highlight');
      if (highlight) {
        highlight.setAttribute('style', 'opacity: 0;');
      }
    }
  }
}