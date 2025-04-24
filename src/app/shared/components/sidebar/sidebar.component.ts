import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;
  showPlatformDropdown = false;
  selectedPlatform = 'instagram'; // Default to Instagram
  
  get platformDisplayName(): string {
    return this.selectedPlatform === 'all' ? 'All Platforms' : 'Instagram';
  }
  
  @Output() closeMobileSidebar = new EventEmitter<void>();
  @Output() addAccountClicked = new EventEmitter<void>();
  
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'fa-chart-pie', route: '/dashboard', active: false },
    { label: 'Content Creation', icon: 'fa-edit', route: '/content-creation', active: false },
    { label: 'Schedule', icon: 'fa-calendar-alt', route: '/schedule', active: false },
    { label: 'Analytics', icon: 'fa-chart-line', route: '/analytics', active: false },
    { label: 'Help', icon: 'fa-question-circle', route: '/onboarding', active: false }
  ];
  
  constructor(private router: Router) {
    this.setActiveRoute(this.router.url);
    
    // Subscribe to router events to update active item
    this.router.events.subscribe(() => {
      this.setActiveRoute(this.router.url);
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  setActiveRoute(url: string): void {
    this.navItems.forEach(item => {
      item.active = url.includes(item.route);
    });
  }
  
  // Close mobile sidebar when clicking a navigation item
  onNavItemClick(): void {
    // Check if we're on mobile view by window width
    if (window.innerWidth <= 768) {
      this.closeMobileSidebar.emit();
    }
  }
  
  // Handle closing the sidebar with close button on mobile
  closeSidebar(): void {
    this.closeMobileSidebar.emit();
  }
  
  // Toggle platform selection dropdown
  togglePlatformDropdown(): void {
    if (!this.isCollapsed) {
      this.showPlatformDropdown = !this.showPlatformDropdown;
    }
  }
  
  // Select a platform from the dropdown
  selectPlatform(platform: string): void {
    this.selectedPlatform = platform;
    this.showPlatformDropdown = false;
  }
  
  // Show the add account popup
  showAddAccount(): void {
    this.addAccountClicked.emit();
    this.showPlatformDropdown = false;
  }
  
  // Close the dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const platformSelector = document.querySelector('.platform-selector');
    const platformDropdown = document.querySelector('.platform-dropdown');
    
    if (platformSelector && platformDropdown) {
      const clickedInside = platformSelector.contains(event.target as Node) || 
                            platformDropdown.contains(event.target as Node);
      
      if (!clickedInside && this.showPlatformDropdown) {
        this.showPlatformDropdown = false;
      }
    }
  }
}
