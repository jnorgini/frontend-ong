import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  data: string[] = [];

  constructor(private axiosService: AxiosService) {}

  // Função para fazer a chamada de API quando necessário, por exemplo, em resposta a um botão clicado

  
  makeAPICall() {
    this.axiosService.request(
      "POST",
      "/register",
      {}).then(
      (response) => {
          this.data = response.data;
      }).catch(
      (error) => {
          if (error.response && error.response.status === 401) {
              // Trate o erro de autenticação aqui (por exemplo, redirecionando para a página de login)
          } else {
              // Trate outros erros aqui
              console.error(error);
          }
      }
    );
  }
}