import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, tap } from 'rxjs';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
    selector: 'app-add-pet',
    templateUrl: './pet-dialog.component.html',
    styleUrls: ['./pet-dialog.component.css']
})
export class PetDialogComponent implements OnInit {
    pet: Pet = <Pet>{};
    loading: boolean = false;
    editMode: boolean = false;
    inputAge: number = 0;
    selectedUnit: string | undefined;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: Pet,
        private dialog: MatDialog,
        private service: PetService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.service.listen().subscribe((m: any) => {
            console.log(m);
        });

        if (data.id !== 0) {
            this.pet = data;
            this.editMode = true;
        }

        this.setInputAge();
        this.setSelectedUnit();
    }

    ngOnInit() {
        this.router.events
            .subscribe(() => {
                this.dialog.closeAll();
            });
    }

    validateFields(): boolean {
        if (!this.pet.name || !this.pet.species || !this.pet.gender || !this.pet.ageInMonths ||
            !this.pet.breed || !this.pet.size || !this.pet.weight) {
            this.toastr.warning('Erro. Certifique-se de preencher corretamente o formulário.');
            return false;
        }
        return true;
    }

    createPet(): Pet {
        if (!this.validateFields()) {
            return {} as Pet;
        }
        this.loading = true;
        this.service.addPet(this.pet)
            .pipe(
                catchError((error) => {
                    this.toastr.error('Erro ao tentar adicionar novo Pet.');
                     this.closeForm();
                    throw error;
                }),
                finalize(() => {
                    this.loading = false;
                }), tap(() => {
                    this.toastr.success('Pet adicionado com sucesso!')
                })
            ).subscribe(() => {
                this.closeForm();
            })
        return this.pet;
    }

    editPet(pet: Pet): Pet {
        if (!this.validateFields()) {
            return {} as Pet;
        }

        if (pet.microchip === null) {
            pet.microchip = "";
        }
        
        this.loading = true;
        this.service.updatePet(pet)
            .pipe(
                catchError((error) => {
                    this.toastr.error('Erro ao tentar editar o Pet.');
                    this.closeForm();
                    throw error;
                }),
                finalize(() => {
                    this.loading = false;
                }), tap(() => {
                    this.toastr.success('Pet modificado com sucesso!')
                })
            )
            .subscribe(() => {
                this.closeForm();
            })
        return this.pet;
    }

    closeForm() {
        this.dialog.closeAll();
    }

    setInputAge(): void {
        let age = this.pet.ageInMonths;
        this.inputAge = age >= 12
            ? Math.floor(age / 12)
            : age;
    }

    setSelectedUnit(): void {
        let age = this.pet.ageInMonths;
        this.selectedUnit = age >= 12
            ? "years"
            : "months";
    }

    calculateAgeInMonths() {
        let age = this.inputAge;
        this.pet.ageInMonths = this.selectedUnit === 'years'
            ? age * 12
            : age;
    }
}
