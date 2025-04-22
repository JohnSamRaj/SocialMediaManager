import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, AuthCredentials, RegisterCredentials } from '../models/user.model';
import { Router } from '@angular/router';
import { InMemoryDbService } from '../services/in-memory-db.service';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(
    private router: Router,
    private dbService: InMemoryDbService
  ) {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(credentials: AuthCredentials): Observable<User> {
    // In a real app, this would call an API
    return this.dbService.login(credentials).pipe(
      delay(800), // Simulate network delay
      tap(user => {
        this.storeUserData(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  register(credentials: RegisterCredentials): Observable<User> {
    // In a real app, this would call an API
    return this.dbService.register(credentials).pipe(
      delay(800), // Simulate network delay
      tap(user => {
        this.storeUserData(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }

  loginWithGoogle(): Observable<User> {
    // In a real app, this would integrate with Google OAuth
    const mockUser: User = {
      id: 1,
      fullName: 'Google User',
      email: 'google@example.com',
      profilePicture: 'https://via.placeholder.com/150',
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    this.storeUserData(mockUser);
    this.currentUserSubject.next(mockUser);
    return of(mockUser).pipe(delay(800));
  }

  loginWithApple(): Observable<User> {
    // In a real app, this would integrate with Apple OAuth
    const mockUser: User = {
      id: 2,
      fullName: 'Apple User',
      email: 'apple@example.com',
      profilePicture: 'https://via.placeholder.com/150',
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    this.storeUserData(mockUser);
    this.currentUserSubject.next(mockUser);
    return of(mockUser).pipe(delay(800));
  }

  private storeUserData(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', 'mock-jwt-token'); // In a real app, this would be a JWT
  }
}
