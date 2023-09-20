import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private url: string = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url);
  }

  add(data: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.url, data);
  }

  update(obj: Pet): Observable<Pet> {
    const editUrl = `${this.url}/${obj.id}`;
    return this.http.put<Pet>(editUrl, obj);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id)
  }

}