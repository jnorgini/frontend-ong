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
import { DeleteConfirmationDialogComponent } from 'src/app/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.css']
})
export class PetTableComponent implements OnInit {
  dataSource = new MatTableDataSource<Pet>();
  displayedColumns: string[] =
    ['id', 'name', 'species', 'gender', 'age', 'breed', 'size',
      'weight', 'microchip', 'acoes'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  searchTerm: string = '';
  isAvailablePets = true;

  constructor(
    private dialog: MatDialog,
    private service: PetService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.showAllPets();
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

  private listPets() {
    if (this.isAvailablePets) {
      this.service.getPets().subscribe(res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.service.getUnavailablePets().subscribe(res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  showAllPets() {
    this.service.getAllPets().subscribe(res => {
      this.isAvailablePets = true;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    })
  }

  showAvailablePets() {
    this.isAvailablePets = true;
    this.listPets();
  }

  showUnavailablePets() {
    this.isAvailablePets = false;
    this.listPets();
  }

  showMoreInfo(pet: Pet) {
    this.dialog.open(PetInfosComponent, {
      data: Object.assign({}, pet)
    })
  };

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

  openDeleteConfirmationDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: 'Você deseja mover o pet para adotados ou excluí-lo permanentemente?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'turnUnavailable') {
        this.turnUnavailable(id);
      } else if (result === 'deletePermanently') {
        this.removePet(id);
      }
    });
  }

  turnUnavailable(id: number) {
    this.service.turnUnavailable(id)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar mover o pet para adotados');
          throw error;
        }),
        tap(() => {
          this.toastr.success('Pet movido para adotados com sucesso!')
        })
      )
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(pet => pet.id !== id);
        this.paginator._changePageSize(this.paginator.pageSize);
      })
  }

  removePet(id: number) {
    this.service.deletePet(id)
      .pipe(
        catchError((error) => {
          this.toastr.error('Erro ao tentar remover o pet. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }),
        tap(() => {
          this.toastr.warning('Pet permanentemente removido.')
        })
      )
      .subscribe(() => {
        this.listPets();
      });
  }

  turnAvailable(id: number) {
    this.service.turnAvailable(id)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar restaurar pet');
          throw error;
        }),
        tap(() => {
          this.toastr.success('Pet restaurado com sucesso!')
        })
      )
      .subscribe(() => {
        this.showUnavailablePets(); 
      });
  }

  searchPets() {
    const key = this.searchTerm.toLowerCase();

    this.dataSource.filter = key;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (key === '') {
      this.listPets();
    }
  }

}