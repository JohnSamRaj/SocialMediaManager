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
    const filterMap: {[key: string]: (notification: Notification) => boolean} = {
      'unread': notification => !notification.read,
      'mentions': notification => notification.type === 'mention',
      'system': notification => notification.type === 'system',
      'all': () => true
    };
    
    return this.notifications.filter(filterMap[this.activeFilter]);
  }
  
  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    
    return seconds < 5 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
  }
  
  getNotificationIcon(type: string): string {
    const iconMap: {[key: string]: string} = {
      'like': 'fa-heart',
      'comment': 'fa-comment',
      'follow': 'fa-user-plus',
      'mention': 'fa-at',
      'system': 'fa-bell'
    };
    return iconMap[type] || 'fa-bell';
  }
}