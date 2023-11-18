import { Component, Inject } from '@angular/core';
import { User } from '../models/User';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
  user: User = <User>{};
  editMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: User,
    private dialog: MatDialog,
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
) {
    this.service.listen().subscribe((m: any) => {
        console.log(m);
    });
  }

  createUser() {
    //TODO
  }

  editUser() {
    //TODO
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
