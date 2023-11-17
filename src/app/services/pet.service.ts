import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Pet } from '../models/Pet';
import { PetModel } from '../models/PetModel';
import { environment } from 'src/environments/environment';

const PETS_API_URL = `${environment.API_URL}/pets`;

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getPets(): Observable<PetModel[]> {
    return this.http.get<PetModel[]>(PETS_API_URL);
  }

  getAvailablePets(): Observable<PetModel[]> {
    return this.http.get<PetModel[]>(`${PETS_API_URL}?status=available`);
  }

  getUnavailablePets(): Observable<PetModel[]> {
    return this.http.get<PetModel[]>(`${PETS_API_URL}?status=unavailable`);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(PETS_API_URL, pet);
  }

  updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${PETS_API_URL}/${pet.id}`, pet);
  }

  deletePet(id: number): Observable<Pet> {
    return this.http.delete<Pet>(`${PETS_API_URL}/${id}`);
  }

  private _listners = new Subject<any>();
  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  turnAvailable(id: number): Observable<Pet> {
    return this.http.put<Pet>(`${PETS_API_URL}/${id}/available`, {});
  }

  turnUnavailable(id: number): Observable<Pet> {
    return this.http.delete<Pet>(`${PETS_API_URL}/${id}/available`, {});
  }

}
