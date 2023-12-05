import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { Subject } from 'rxjs';
import { Pet } from '../models/Pet';
import { PetModel } from '../models/PetModel';
import { environment } from 'src/environments/environment';

const PETS_API_URL = `${environment.API_URL}/pets`;

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  getPets(status?: string): Observable<PetModel[]> {
    this.loadingSubject.next(true);
    const url = status ? `${PETS_API_URL}?status=${status}` : PETS_API_URL;
    return this.http.get<PetModel[]>(url).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  addPet(pet: Pet): Observable<Pet> {
    this.loadingSubject.next(true);
    return this.http.post<Pet>(PETS_API_URL, pet).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  updatePet(pet: Pet): Observable<Pet> {
    this.loadingSubject.next(true);
    return this.http.put<Pet>(`${PETS_API_URL}/${pet.id}`, pet).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  deletePet(id: number): Observable<Pet> {
    this.loadingSubject.next(true);
    return this.http.delete<Pet>(`${PETS_API_URL}/${id}`).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  turnAvailable(id: number): Observable<Pet> {
    this.loadingSubject.next(true);
    return this.http.put<Pet>(`${PETS_API_URL}/${id}/available`, {}).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

  turnUnavailable(id: number): Observable<Pet> {
    this.loadingSubject.next(true);
    return this.http.delete<Pet>(`${PETS_API_URL}/${id}/available`, {}).pipe(
      finalize(() => {
        this.loadingSubject.next(false); 
      })
    );
  }

}
