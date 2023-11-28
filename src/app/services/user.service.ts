import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

const USERS_API_URL = `${environment.API_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private updateListener = new Subject<void>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_API_URL);
  }

  getUser(userId: number): Observable<User> {
    const url = `${USERS_API_URL}/${userId}`;
    return this.http.get<User>(url);
  }

  postUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(USERS_API_URL, user, { headers });
  }
  
  putUser(updatedUser: User): Observable<User> {
    const url = `${USERS_API_URL}/${updatedUser.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(url, updatedUser, { headers });
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${USERS_API_URL}/${userId}`;
    return this.http.delete<void>(url);
  }
  
  emitUpdate() {
    this.updateListener.next();
  }

  onUpdate() {
    return this.updateListener.asObservable();
  }

}
