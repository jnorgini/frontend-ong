import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../modelo/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  // URL da API
  private selectUrl:string = 'http://localhost:8080/dogs/all';
  private addUrl:string = 'http://localhost:8080/dogs/add';
  private updateUrl:string = 'http://localhost:8080/dogs/update';
  private deleteUrl:string = 'http://localhost:8080/dogs';

  // Construtor
  constructor(private http:HttpClient) { }

  // Método para selecionar todos 
  selecionar():Observable<Pet[]>{
    return this.http.get<Pet[]>(this.selectUrl);
  }

  // Método para cadastrar 
  cadastrar(obj:Pet):Observable<Pet>{
    return this.http.post<Pet>(this.addUrl, obj);
  }

  // Método para atualizar 
  editar(obj:Pet):Observable<Pet>{
    return this.http.put<Pet>(this.updateUrl, obj);
  }

  // Método para remover
  remover(id:number):Observable<void>{
    return this.http.delete<void>(this.deleteUrl + '/' + id)
  }

}
