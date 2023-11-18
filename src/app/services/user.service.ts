import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

const USERS_API_URL = `${environment.API_URL}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_API_URL);
  }

  getUser(userId: number): Observable<User> {
    const url = `${USERS_API_URL}/${userId}`;
    return this.http.get<User>(url);
  }

  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }

}
