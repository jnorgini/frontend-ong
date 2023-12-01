import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

const USERS_API_URL = `${environment.API_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private updateListener = new Subject<void>();

  constructor(private http: HttpClient) { }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  getUsers(): Observable<User[]> {
    this.loadingSubject.next(true);
    return this.http.get<User[]>(USERS_API_URL).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  getUser(userId: number): Observable<User> {
    this.loadingSubject.next(true);
    const url = `${USERS_API_URL}/${userId}`;
    return this.http.get<User>(url).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  postUser(user: User): Observable<any> {
    this.loadingSubject.next(true);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(USERS_API_URL, user, { headers }).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }  
  
  putUser(updatedUser: User): Observable<User> {
    this.loadingSubject.next(true);
    const url = `${USERS_API_URL}/${updatedUser.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(url, updatedUser, { headers }).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  deleteUser(userId: number): Observable<void> {
    this.loadingSubject.next(true);
    const url = `${USERS_API_URL}/${userId}`;
    return this.http.delete<void>(url).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }
  
  emitUpdate() {
    this.updateListener.next();
  }

  onUpdate() {
    return this.updateListener.asObservable();
  }

}
