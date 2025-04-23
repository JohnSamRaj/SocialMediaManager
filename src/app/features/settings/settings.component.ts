import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  notificationForm: FormGroup;
  securityForm: FormGroup;
  connectedAccountsForm: FormGroup;
  
  activeTab: 'profile' | 'notifications' | 'security' | 'connectedAccounts' = 'profile';
  isLoading = false;
  successMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Initialize forms
    this.profileForm = this.fb.group({
      fullName: [''],
      email: [''],
      bio: [''],
      location: [''],
      website: ['']
    });
    
    this.notificationForm = this.fb.group({
      emailNotifications: [true],
      pushNotifications: [true],
      postActivityNotifications: [true],
      accountNotifications: [true],
      marketingEmails: [false]
    });
    
    this.securityForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
    
    this.connectedAccountsForm = this.fb.group({
      instagramConnected: [false],
      facebookConnected: [false],
      twitterConnected: [false],
      linkedinConnected: [false]
    });
  }
  
  ngOnInit(): void {
    // Load user data
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.profileForm.patchValue({
        fullName: currentUser.fullName,
        email: currentUser.email
      });
    }
  }
  
  setActiveTab(tab: 'profile' | 'notifications' | 'security' | 'connectedAccounts'): void {
    this.activeTab = tab;
  }
  
  saveProfileSettings(): void {
    this.isLoading = true;
    this.successMessage = '';
    
    // Simulate API call delay
    setTimeout(() => {
      // Save profile settings logic would go here
      
      this.isLoading = false;
      this.successMessage = 'Profile settings saved successfully!';
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 1000);
  }
  
  saveNotificationSettings(): void {
    this.isLoading = true;
    this.successMessage = '';
    
    // Simulate API call delay
    setTimeout(() => {
      // Save notification settings logic would go here
      
      this.isLoading = false;
      this.successMessage = 'Notification settings saved successfully!';
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 1000);
  }
  
  saveSecuritySettings(): void {
    this.isLoading = true;
    this.successMessage = '';
    
    // Simulate API call delay
    setTimeout(() => {
      // Save security settings logic would go here
      
      this.isLoading = false;
      this.successMessage = 'Security settings saved successfully!';
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 1000);
  }
  
  connectAccount(platform: string): void {
    // Logic for connecting to a social media platform would go here
    console.log(`Connecting to ${platform}...`);
  }
  
  disconnectAccount(platform: string): void {
    // Logic for disconnecting from a social media platform would go here
    console.log(`Disconnecting from ${platform}...`);
  }
}