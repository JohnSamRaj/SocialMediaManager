import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TourComponent } from './shared/components/tour/tour.component';
import { ToastMessageComponent } from './shared/components/toast-message/toast-message.component';
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
    ToastMessageComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Social Media Manager';
  isSidebarOpen = false;
  
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
  }
  
  /**
   * Toggles the mobile sidebar menu open/closed
   */
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    
    // Add no-scroll class to body when sidebar is open on mobile
    if (this.isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
}
