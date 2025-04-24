import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TourComponent } from './shared/components/tour/tour.component';
import { ToastMessageComponent } from './shared/components/toast-message/toast-message.component';
import { AddPlatformModalComponent } from './shared/components/add-platform-modal/add-platform-modal.component';
import { OnboardingModalComponent } from './shared/components/onboarding-modal/onboarding-modal.component';
import { AuthService } from './core/auth/auth.service';
import { TourService } from './core/services/tour.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    TourComponent,
    ToastMessageComponent,
    AddPlatformModalComponent,
    OnboardingModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Social Media Manager';
  isSidebarOpen = false;
  
  @ViewChild(AddPlatformModalComponent) addPlatformModal!: AddPlatformModalComponent;
  @ViewChild(OnboardingModalComponent) onboardingModal!: OnboardingModalComponent;
  
  constructor(
    public authService: AuthService,
    private tourService: TourService
  ) {}
  
  ngOnInit(): void {
    // The tour service will automatically start the tour for first-time users
    
    // Listen for content creation page load to auto-collapse sidebar
    document.addEventListener('content-creation-loaded', () => {
      // Only collapse if sidebar is open
      if (this.isSidebarOpen) {
        this.toggleSidebar();
      }
    });
    
    // Check for first-time users
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    // After authentication is complete, show onboarding for first-time users
    if (this.authService.isLoggedIn() && !hasCompletedOnboarding) {
      // Wait for component to be fully initialized
      setTimeout(() => {
        this.openOnboardingModal();
        // Mark onboarding as completed
        localStorage.setItem('hasCompletedOnboarding', 'true');
      }, 1000);
    }
  }
  
  /**
   * Toggles the mobile sidebar menu open/closed
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    
    // Add no-scroll class to body when sidebar is open on mobile
    if (this.isSidebarOpen) {
      document.body.classList.add('no-scroll');
      
      // For mobile devices, ensure the sidebar is visible with a slight delay
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          const sidebarEl = document.querySelector('.sidebar');
          if (sidebarEl) {
            sidebarEl.classList.add('show');
          }
        }, 50);
      }
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  
  /**
   * Opens the add platform modal
   */
  openAddPlatformModal(): void {
    if (this.addPlatformModal) {
      this.addPlatformModal.show();
    }
  }
  
  /**
   * Opens the onboarding modal
   */
  openOnboardingModal(): void {
    if (this.onboardingModal) {
      this.onboardingModal.show();
    }
  }
}
