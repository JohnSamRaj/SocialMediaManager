import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { TourComponent } from './shared/components/tour/tour.component';
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
    TourComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Social Media Manager';
  
  constructor(
    public authService: AuthService,
    private tourService: TourService
  ) {}
  
  ngOnInit(): void {
    // The tour service will automatically start the tour for first-time users
  }
}
