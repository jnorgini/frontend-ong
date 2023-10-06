import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { PetModel } from 'src/app/models/PetModel';
import { PetInfosComponent } from 'src/app/pet-infos/pet-infos.component';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  dataSource = new MatTableDataSource<PetModel>();
  displayedColumns: string[] =
    ['id', 'name', 'species', 'gender', 'age', 'breed', 'size',
     'weight', 'microchip', 'acoes'];

     @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: PetService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUnavailablePets();
  }

  private getUnavailablePets() {
    this.service.getUnavailablePets().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  showMoreInfo(petModel: PetModel) {
    this.dialog.open(PetInfosComponent, {
      data: Object.assign({}, petModel)
    })
  };

  removePet(id: number) {
    this.service.deletePet(id)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar remover o pet. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }),
          tap(() => {
            this.toastr.success('Pet permanentemente removido.')
          })
      )
      .subscribe(() => {
        this.getUnavailablePets();
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
        this.getUnavailablePets();
        this.turnAvailable;
      });
    }
  
}