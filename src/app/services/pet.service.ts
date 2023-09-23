import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../models/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl: string = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http
        .get(this.apiUrl)
        .pipe<Pet[]>(map((data: any) => data));
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${pet.id}`, pet);
  }

  deletePet(id: number): Observable<Pet> {
    return this.http.delete<Pet>(`${this.apiUrl}/${id}`);
  }

  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }

}
