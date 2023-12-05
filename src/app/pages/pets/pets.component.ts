import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, tap } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { PetDialogComponent } from 'src/app/pet-dialog/pet-dialog.component';
import { PetInfosComponent } from 'src/app/pet-infos/pet-infos.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  loading = false; 
  dataSource = new MatTableDataSource<Pet>();
  displayedColumns: string[] =
    ['id', 'name', 'species', 'gender', 'age', 'breed', 'size',
      'weight', 'status', 'acoes'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  searchTerm: string = '';
  isAvailablePets = true;
  selectedOption: string = 'showAll';

  constructor(
    private dialog: MatDialog,
    private service: PetService,
    private toastr: ToastrService
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

  private listPets(status?: string) {
    this.loading = true;
    this.service.getPets(status).subscribe({
      next: res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.loading = false; 
      },
      error: err => {
        this.loading = false; 
        console.error('Ocorreu um erro ao buscar os pets:', err);
      }
    });
  }
  
  showAllPets() {
    this.listPets();
    this.isAvailablePets = true;
    this.dataSource.paginator = this.paginator;
  }

  showAvailablePets() {
    this.listPets('available');
    this.isAvailablePets = true;
  }

  showUnavailablePets() {
    this.listPets('unavailable');
    this.isAvailablePets = false;
  }

  showMoreInfo(pet: Pet) {
    this.dialog.open(PetInfosComponent, {
      closeOnNavigation: true,
      data: Object.assign({}, pet)
    })
  };

  showCreatePetForm() {
    this.dialog.open(PetDialogComponent, {
      closeOnNavigation: true,
      data: new Pet()
    })
      .afterClosed().subscribe(() => {
        if (this.selectedOption === 'showAll') {
          this.showAllPets();
        } else if (this.selectedOption === 'showAvailable') {
          this.showAvailablePets();
        } else if (this.selectedOption === 'showUnavailable') {
          this.showUnavailablePets();
        }
      });
  }

  showEditPetForm(pet: Pet) {
    this.dialog.open(PetDialogComponent, {
      closeOnNavigation: true,
      data: Object.assign({}, pet)
    }).afterClosed().subscribe(() => {
      if (this.selectedOption === 'showAll') {
        this.showAllPets();
      } else if (this.selectedOption === 'showAvailable') {
        this.showAvailablePets();
      } else if (this.selectedOption === 'showUnavailable') {
        this.showUnavailablePets();
      }
    });
  }

  openConfirmationDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      data: 'Deseja mover o pet para a lista de adotados?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'turnUnavailable') {
        this.turnUnavailable(id);
      } else if (result === 'deletePermanently') {
        this.removePet(id);
      }

      if (this.selectedOption === 'showAll') {
        this.showAllPets();
      } else if (this.selectedOption === 'showAvailable') {
        this.showAvailablePets();
      } else if (this.selectedOption === 'showUnavailable') {
        this.showUnavailablePets();
      }
    });
  }

  deleteConfirmationDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      closeOnNavigation: true,
      data: 'Deseja remover permanentemente o pet?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'turnUnavailable') {
        this.removePet(id);
      } 

      if (this.selectedOption === 'showAll') {
        this.showAllPets();
      } else if (this.selectedOption === 'showAvailable') {
        this.showAvailablePets();
      } else if (this.selectedOption === 'showUnavailable') {
        this.showUnavailablePets();
      }
    });
  }

  restoreConfirmationDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      data: 'Deseja restaurar o pet para a lista de disponíveis?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'turnUnavailable') {
        this.turnAvailable(id);
      } 

      if (this.selectedOption === 'showAll') {
        this.showAllPets();
      } else if (this.selectedOption === 'showAvailable') {
        this.showAvailablePets();
      } else if (this.selectedOption === 'showUnavailable') {
        this.showUnavailablePets();
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
        if (this.selectedOption === 'showAll') {
          this.showAllPets();
        } else if (this.selectedOption === 'showAvailable') {
          this.showAvailablePets();
        } else if (this.selectedOption === 'showUnavailable') {
          this.showUnavailablePets();
        }
      });
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
        if (this.selectedOption === 'showAll') {
          this.showAllPets();
        } else if (this.selectedOption === 'showAvailable') {
          this.showAvailablePets();
        } else if (this.selectedOption === 'showUnavailable') {
          this.showUnavailablePets();
        }
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
        if (this.selectedOption === 'showAll') {
          this.showAllPets();
        } else if (this.selectedOption === 'showAvailable') {
          this.showAvailablePets();
        } else if (this.selectedOption === 'showUnavailable') {
          this.showUnavailablePets();
        }
      });
  }

  searchPets() {
    const key = this.searchTerm.toLowerCase();

    this.dataSource.filter = key;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onOptionChange() {
    if (this.selectedOption === 'showAll') {
      this.showAllPets();
    } else if (this.selectedOption === 'showAvailable') {
      this.showAvailablePets();
    } else if (this.selectedOption === 'showUnavailable') {
      this.showUnavailablePets();
    }
  }

}
