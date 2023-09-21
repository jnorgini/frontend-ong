import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/Pet';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  private url: string = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url);
  }

  create(obj: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.url, obj)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  
  edit(obj: Pet): Observable<Pet> {
    const editUrl = `${this.url}/${obj.id}`;
    return this.http.put<Pet>(editUrl, obj);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id)
  }

  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

}