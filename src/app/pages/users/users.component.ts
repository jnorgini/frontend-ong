import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from 'src/app/user-dialog/user-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'username', 'role', 'acoes'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.dataSource.data = data;
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
    });
  }

  showCreateUserForm() {
    this.dialog.open(UserDialogComponent, {
      closeOnNavigation: true,
      data: new User()
    })
      .afterClosed().subscribe(() => {
        this.userService.getUsers();
      });
  }

  addNewUser() {
    //TODO
  }

  openEditForm() {
    //TODO
  }

  removeUser() {
    //TODO
  }

  // formatPassword(password: string): string {
  //   return '•'.repeat(password.length);
  // }
}
