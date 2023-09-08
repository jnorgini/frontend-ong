import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from '../modelo/Dog';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  // URL da API
  private selectUrl:string = 'http://localhost:8080/dogs/all';
  private addUrl:string = 'http://localhost:8080/dogs/add';
  private updateUrl:string = 'http://localhost:8080/dogs/update';
  private deleteUrl:string = 'http://localhost:8080/dogs';

  // Construtor
  constructor(private http:HttpClient) { }

  // Método para selecionar todos 
  selecionar():Observable<Dog[]>{
    return this.http.get<Dog[]>(this.selectUrl);
  }

  // Método para cadastrar 
  cadastrar(obj:Dog):Observable<Dog>{
    return this.http.post<Dog>(this.addUrl, obj);
  }

  // Método para atualizar 
  editar(obj:Dog):Observable<Dog>{
    return this.http.put<Dog>(this.updateUrl, obj);
  }

  // Método para remover
  remover(id:number):Observable<void>{
    return this.http.delete<void>(this.deleteUrl + '/' + id)
  }

}
