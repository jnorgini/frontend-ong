import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { catchError, tap } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { PetDialogComponent } from 'src/app/pet-dialog/pet-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PetInfosComponent } from 'src/app/pet-infos/pet-infos.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<Pet>();
  displayedColumns: string[] =
    ['id', 'name', 'species', 'gender', 'birthdate', 'breed', 'size',
     'weight', 'microchip', 'acoes'];

     @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private service: PetService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listPets();
  }

  removePet(id: number) {
    this.service.deletePet(id)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar remover o pet. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }),
          tap(() => {
            this.toastr.success('Pet removido com sucesso!')
          })
      )
      .subscribe(() => {
        this.listPets();
      });
  }

  showCreatePetForm() {
    this.dialog.open(PetDialogComponent, {
      data: new Pet()
    })
      .afterClosed().subscribe(result => {
        this.listPets();
      });
  }

  showEditPetForm(pet: Pet) {
    this.dialog.open(PetDialogComponent, {
      data: Object.assign({}, pet)
    }).afterClosed().subscribe(result => {
      this.listPets();
    });
  }

  private listPets() {
    this.service.getPets().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  showMoreInfo(pet: Pet) {
    this.dialog.open(PetInfosComponent, {
      data: Object.assign({}, pet)
    })
  };
     
}
