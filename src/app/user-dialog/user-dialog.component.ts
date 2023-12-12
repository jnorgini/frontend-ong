import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../models/User';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
  user: User = <User>{};
  editMode = false;
  loading = false;
  existingUsername = false;
  existingUsernames: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: User,
    private dialog: MatDialog,
    private service: UserService,
    private toastr: ToastrService,
  ) {
    this.user = data.id ? data : { ...data, id: 0 };
    this.editMode = data.id !== 0;
  }

  saveUser() {
    if (this.editMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  validateFields(): boolean {
    const { username, password, role, confirmPassword } = this.user;

    if (!username || !password || !role) {
      this.toastr.warning('Erro. Certifique-se de preencher corretamente o formulário.');
      return false;
    }

    if (/\s/.test(username)) {
      this.toastr.warning('Erro em usuário. Não pode haver espaço entre os caracteres.')
      return false;
    }

    if (password.length < 8 || password.length > 16 || /\s/.test(password)) {
      this.toastr.warning('Erro na senha. Certifique-se de que tenha entre 8 e 16 caracteres e não contenha espaços.');
      return false;
    }

    if (password !== confirmPassword) {
      this.toastr.warning('As senhas não coincidem. Por favor, confirme a senha corretamente.');
      return false;
    }
  
    return true;
  }

  createUser() {
    if (!this.validateFields()) {
      return {} as User;
    }

    this.loading = true;

    this.service.postUser(this.user)
      .pipe(
        catchError((error) => {
          if (error.status === 400) {
            this.toastr.warning('Nome de usuário já existe. Escolha um nome de usuário diferente.');
          } else {
            this.toastr.error('Erro ao tentar criar novo usuário. Verifique sua conexão com a internet e tente novamente.');
          }
          this.closeForm();
          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }), tap(() => {
          this.toastr.success('Usuário criado com sucesso!')
        })
      ).subscribe(() => {
        this.closeForm();
      });

    return this.user;
  }

  updateUser() {
    if (!this.validateFields()) {
      return {} as User;
    }

    this.loading = true;

    this.service.putUser(this.user)
      .pipe(
        catchError((error) => {
          this.toastr.error('Erro ao tentar editar usuário. Verifique sua conexão com a internet e tente novamente.');
          this.closeForm();
          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }), tap(() => {
          this.toastr.success('Usuário modificado com sucesso!')
        })
      ).subscribe(() => {
        this.closeForm();
      })
    return this.user;
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
