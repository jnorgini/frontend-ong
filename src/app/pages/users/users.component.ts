import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from 'src/app/user-dialog/user-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'username', 'role', 'acoes'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  loading = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setupUserList();
    this.setupUserUpdateListener();
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  private setupUserList() {
    this.loading = true;

    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  private setupUserUpdateListener() {
    this.userService.onUpdate().subscribe(() => {
      this.setupUserList();
    });
  }

  private setupPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  showCreateUserForm() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      closeOnNavigation: true,
      data: new User()
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.userService.postUser(result).subscribe(() => {
          this.setupUserList();
        });
      }
    });
  }

  showUpdateUserForm(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      closeOnNavigation: true,
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        result.id = user.id;
        this.userService.putUser(result).subscribe(() => {
          this.userService.emitUpdate();
          this.userService.getUsers().subscribe(data => {
            this.dataSource.data = data;
          });
        });
      }
    });
  }

  deleteConfirmationDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      data: 'Deseja remover permanentemente o usuário?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.remove(id);
      }
    });
  }

  remove(id: number) {
    this.userService.deleteUser(id)
      .pipe(
        catchError((error) => {
          this.toastr.error('Erro ao tentar remover usuário.');
          throw error;
        }),
        tap(() => {
          this.toastr.success('Usuário removido com sucesso.');
        })
      )
      .subscribe(() => {
        this.userService.emitUpdate();
      });
  }

}
