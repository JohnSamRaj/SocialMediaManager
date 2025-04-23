import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system';
  message: string;
  source: {
    id: string;
    name: string;
    avatar?: string;
  };
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount: number = 0;
  activeFilter: 'all' | 'unread' | 'mentions' | 'system' = 'all';
  isLoading: boolean = true;
  
  constructor() { }
  
  ngOnInit(): void {
    this.loadNotifications();
  }
  
  loadNotifications(): void {
    // Simulated API call delay
    setTimeout(() => {
      // Mock notifications data
      this.notifications = [
        {
          id: '1',
          type: 'like',
          message: 'liked your post',
          source: {
            id: 'user1',
            name: 'John Smith',
            avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random'
          },
          read: false,
          timestamp: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        },
        {
          id: '2',
          type: 'comment',
          message: 'commented on your post: "Great content! Keep it up!"',
          source: {
            id: 'user2',
            name: 'Jane Doe',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=random'
          },
          read: false,
          timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
        },
        {
          id: '3',
          type: 'follow',
          message: 'started following you',
          source: {
            id: 'user3',
            name: 'Mike Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random'
          },
          read: true,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        {
          id: '4',
          type: 'mention',
          message: 'mentioned you in a comment: "@user check this out!"',
          source: {
            id: 'user4',
            name: 'Sarah Parker',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Parker&background=random'
          },
          read: true,
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
          id: '5',
          type: 'system',
          message: 'Your post has been scheduled and will be published tomorrow at 9:00 AM',
          source: {
            id: 'system',
            name: 'Social Media Manager'
          },
          read: true,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        }
      ];
      
      // Count unread notifications
      this.unreadCount = this.notifications.filter(notification => !notification.read).length;
      this.isLoading = false;
    }, 1000);
  }
  
  markAsRead(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
      this.unreadCount--;
    }
  }
  
  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.unreadCount = 0;
  }
  
  deleteNotification(id: string): void {
    const index = this.notifications.findIndex(notification => notification.id === id);
    if (index !== -1) {
      if (!this.notifications[index].read) {
        this.unreadCount--;
      }
      this.notifications.splice(index, 1);
    }
  }
  
  clearAllNotifications(): void {
    this.notifications = [];
    this.unreadCount = 0;
  }
  
  filterNotifications(filter: 'all' | 'unread' | 'mentions' | 'system'): void {
    this.activeFilter = filter;
  }
  
  getFilteredNotifications(): Notification[] {
    switch (this.activeFilter) {
      case 'unread':
        return this.notifications.filter(notification => !notification.read);
      case 'mentions':
        return this.notifications.filter(notification => notification.type === 'mention');
      case 'system':
        return this.notifications.filter(notification => notification.type === 'system');
      default:
        return this.notifications;
    }
  }
  
  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
  
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
  
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
  
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
  
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
  
    return seconds < 5 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
  }
  
  getNotificationIcon(type: string): string {
    switch (type) {
      case 'like':
        return 'fa-heart';
      case 'comment':
        return 'fa-comment';
      case 'follow':
        return 'fa-user-plus';
      case 'mention':
        return 'fa-at';
      case 'system':
        return 'fa-bell';
      default:
        return 'fa-bell';
    }
  }
}