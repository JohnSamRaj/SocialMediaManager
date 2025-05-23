import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
  
  constructor(private cdr: ChangeDetectorRef) { }
  
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
  
  // Cache for media orientations to avoid recalculation
  private mediaOrientationCache: Map<string, string> = new Map();
  
  // Detect media orientation for proper display (portrait, landscape, or square)
  getMediaOrientation(media: MediaItem): string {
    // Return from cache if already calculated
    if (this.mediaOrientationCache.has(media.id)) {
      return this.mediaOrientationCache.get(media.id)!;
    }
    
    // Default to square until we can determine the actual orientation
    this.mediaOrientationCache.set(media.id, 'square');
    
    if (media.type === 'image') {
      const img = new Image();
      
      // When the image loads, calculate and cache its orientation
      img.onload = () => {
        let orientation = 'square';
        
        if (img.naturalWidth > img.naturalHeight) {
          orientation = 'landscape';
        } else if (img.naturalWidth < img.naturalHeight) {
          orientation = 'portrait';
        }
        
        this.mediaOrientationCache.set(media.id, orientation);
        // Trigger change detection to update the UI
        this.cdr.detectChanges();
      };
      
      img.src = media.url;
    }
    
    return this.mediaOrientationCache.get(media.id)!;
  }
  
  get formattedDate(): string {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
  }
}