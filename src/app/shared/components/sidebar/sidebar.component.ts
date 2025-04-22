import { Component } from '@angular/core';
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
}
