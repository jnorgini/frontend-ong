import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Aqui você pode adicionar a lógica para verificar o nome de usuário e senha.
    // Por exemplo, você pode fazer uma chamada de serviço para autenticação.
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Lógica de autenticação aqui
  }
}
