import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaItem } from '../../../core/models/post.model';

@Component({
  selector: 'app-instagram-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-preview.component.html',
  styleUrls: ['./instagram-preview.component.css']
})
export class InstagramPreviewComponent implements OnChanges {
  @Input() caption: string = '';
  @Input() hashtags: string[] = [];
  @Input() mediaItems: MediaItem[] = [];
  @Input() username: string = 'username';
  @Input() userProfileImage: string = 'assets/images/default-profile.png';
  
  formattedCaption: string = '';
  formattedHashtags: string = '';
  currentSlide: number = 0;
  
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['caption'] || changes['hashtags']) {
      this.formatCaptionAndHashtags();
    }
  }
  
  formatCaptionAndHashtags(): void {
    this.formattedCaption = this.caption;
    
    // Format hashtags with # symbol
    this.formattedHashtags = this.hashtags
      .map(tag => `#${tag}`)
      .join(' ');
  }
  
  nextSlide(): void {
    if (this.currentSlide < this.mediaItems.length - 1) {
      this.currentSlide++;
    }
  }
  
  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
  
  get currentMedia(): MediaItem | null {
    return this.mediaItems.length > 0 ? this.mediaItems[this.currentSlide] : null;
  }
  
  get formattedDate(): string {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
  }
}