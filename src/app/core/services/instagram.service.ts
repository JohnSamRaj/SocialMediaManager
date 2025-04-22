import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, DraftPost, PostStatus } from '../models/post.model';
import { InMemoryDbService } from './in-memory-db.service';
import { AuthService } from '../auth/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  constructor(
    private dbService: InMemoryDbService,
    private authService: AuthService
  ) { }

  getPosts(): Observable<Post[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.id) {
      throw new Error('User not authenticated');
    }
    
    return this.dbService.getPosts(currentUser.id);
  }

  getPostById(postId: string): Observable<Post | undefined> {
    return this.dbService.getPostById(postId);
  }

  createPost(post: DraftPost): Observable<Post> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.id) {
      throw new Error('User not authenticated');
    }
    
    const newPost: DraftPost = {
      ...post,
      userId: currentUser.id
    };
    
    return this.dbService.createPost(newPost);
  }

  updatePost(postId: string, updates: Partial<Post>): Observable<Post> {
    return this.dbService.updatePost(postId, updates);
  }

  deletePost(postId: string): Observable<boolean> {
    return this.dbService.deletePost(postId);
  }

  publishPost(postId: string): Observable<Post> {
    return this.dbService.updatePost(postId, {
      status: PostStatus.PUBLISHED,
      publishedAt: new Date()
    });
  }

  schedulePost(postId: string, scheduledFor: Date): Observable<Post> {
    return this.dbService.updatePost(postId, {
      status: PostStatus.SCHEDULED,
      scheduledFor
    });
  }

  getDraftPosts(): Observable<Post[]> {
    return this.getPosts().pipe(
      map(posts => posts.filter(post => post.status === PostStatus.DRAFT))
    );
  }

  getScheduledPosts(): Observable<Post[]> {
    return this.getPosts().pipe(
      map(posts => posts.filter(post => post.status === PostStatus.SCHEDULED))
    );
  }

  getPublishedPosts(): Observable<Post[]> {
    return this.getPosts().pipe(
      map(posts => posts.filter(post => post.status === PostStatus.PUBLISHED))
    );
  }

  // In a real app, this would call an Instagram API
  getInstagramInsights(): Observable<any> {
    // This would normally fetch insights from Instagram's API
    // For now, we'll just return some mock data
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.id) {
          throw new Error('User not authenticated');
        }
        return this.dbService.getAnalytics(user.id);
      })
    );
  }
}
