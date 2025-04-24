import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PlatformOption {
  id: string;
  name: string;
  icon: string;
  available: boolean;
  description: string;
}

@Component({
  selector: 'app-add-platform-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-platform-modal.component.html',
  styleUrls: ['./add-platform-modal.component.css']
})
export class AddPlatformModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  
  isVisible = false;
  
  platformOptions: PlatformOption[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'fab fa-instagram',
      available: true,
      description: 'Connect your Instagram Business account to schedule and publish content.'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'fab fa-facebook',
      available: false,
      description: 'Connect your Facebook Pages to schedule and publish content. (Coming Soon)'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'fab fa-twitter',
      available: false,
      description: 'Connect your Twitter account to schedule and publish tweets. (Coming Soon)'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'fab fa-linkedin',
      available: false,
      description: 'Connect your LinkedIn profile or company page. (Coming Soon)'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: 'fab fa-pinterest',
      available: false,
      description: 'Connect your Pinterest account to schedule and publish pins. (Coming Soon)'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'fab fa-tiktok',
      available: false,
      description: 'Connect your TikTok account to schedule and publish videos. (Coming Soon)'
    }
  ];
  
  show(): void {
    this.isVisible = true;
    document.body.classList.add('no-scroll');
  }
  
  hide(): void {
    this.isVisible = false;
    document.body.classList.remove('no-scroll');
    this.closeModal.emit();
  }
  
  connectPlatform(platformId: string): void {
    if (platformId !== 'instagram') {
      return; // Only Instagram is available for now
    }
    
    // In a real app, this would redirect to the authentication flow
    // For now, just close the modal
    this.hide();
  }
}