import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../models/User';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
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

  createUser() {
    this.service.postUser(this.user)
      .pipe(
        catchError((error) => {
          this.toastr.error('Erro ao tentar criar novo usuário.');
          throw error;
        }),
        tap(() => {
          this.toastr.success('Novo usuário criado com sucesso!');
          this.service.emitUpdate();
          this.closeForm();
        })
      )
      .subscribe();
      this.closeForm();
  }

  updateUser() {
    this.service.putUser(this.user)
      .pipe(
        catchError((error) => {
          this.toastr.error('Erro ao tentar editar usuário.');
          throw error;
        }),
        tap(() => {
          this.toastr.success('Usuário editado com sucesso!');
          this.service.emitUpdate();
          this.closeForm();
        })
      )
      .subscribe();
      this.closeForm();
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
