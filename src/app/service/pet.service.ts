import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../modelo/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  // URL da API
  private url:string = 'http://localhost:8080/pets';

  // Construtor
  constructor(private http:HttpClient) { }

  // Método para selecionar todos 
  selecionar():Observable<Pet[]>{
    return this.http.get<Pet[]>(this.url);
  }

  // Método para cadastrar 
  cadastrar(obj:Pet):Observable<Pet>{
    return this.http.post<Pet>(this.url, obj);
  }

  // Método para atualizar 
  editar(obj:Pet):Observable<Pet>{
    return this.http.put<Pet>(this.url, obj + '/');
  }

  // Método para remover
  remover(id:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + id)
  }

}
