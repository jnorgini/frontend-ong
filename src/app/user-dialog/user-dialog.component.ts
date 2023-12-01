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
  loading: boolean = false;
  user: User = <User>{};
  editMode = false;

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
    if (!this.user.username || !this.user.password || !this.user.role) {
      this.toastr.warning('Erro. Certifique-se de preencher corretamente o formulário.');
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
          this.toastr.error('Erro ao tentar criar novo usuário. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }), tap(() => {
          this.toastr.success('Novo usuário criado com sucesso!');
          this.service.emitUpdate();
          this.closeForm();
        })
      ).subscribe(() => {
        this.closeForm();
      })
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
          this.toastr.error('Erro ao tentar editar novo usuário. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }),
        finalize(() => {
          this.loading = false;
        }), tap(() => {
          this.toastr.success('Usuário editado com sucesso!');
          this.service.emitUpdate();
          this.closeForm();
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
