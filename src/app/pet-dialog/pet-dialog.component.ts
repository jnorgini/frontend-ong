import { Component, Inject } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/Pet';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-pet',
    templateUrl: './pet-dialog.component.html',
    styleUrls: ['./pet-dialog.component.css']
})
export class PetDialogComponent {
    pet = <Pet>{};
    editMode: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: Pet,
        private dialog: MatDialog,
        private service: PetService,
        private toastr: ToastrService
    ) {
        this.service.listen().subscribe((m: any) => {
            console.log(m);
        });

        if (data.id !== 0) {
            this.pet = data;
            this.editMode = true;
        }
    }

    createPet(): Pet {
        this.service.addPet(this.pet)
            .pipe(
                catchError((error) => {
                    this.toastr.warning('Erro ao tentar cadastrar novo pet. Verifique sua conexão com a internet e tente novamente.');
                    throw error;
                }), tap(() => {
                    this.toastr.success('Novo pet adicionado com sucesso!')
                })
            ).subscribe(res => {
              this.closeForm();
            })
        return this.pet;
    }

    editPet(pet: Pet): Pet {
        this.service.updatePet(pet)
            .pipe(
                catchError((error) => {
                    this.toastr.warning('Erro ao tentar alterar pet. Verifique sua conexão com a internet e tente novamente.');
                    throw error;
                }), tap(() => {
                    this.toastr.success('Pet alterado com sucesso!')
                })
            )
            .subscribe(res => {
                this.closeForm();
            })
        return this.pet;
    }

    closeForm() {
      this.dialog.closeAll();
    }
    
}
