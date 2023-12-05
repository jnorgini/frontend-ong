import { Component, Inject } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/Pet';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pet-infos',
  templateUrl: './pet-infos.component.html',
  styleUrls: ['./pet-infos.component.css']
})
export class PetInfosComponent {
  pet = <Pet>{};
  selectedUnit: string = 'months';

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Pet,
    private dialog: MatDialog,
    private service: PetService
  ) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
    });

    if (data.id !== 0) {
      this.pet = data;
      this.selectedUnit = this.pet.ageInMonths >= 12 ? 'years' : 'months';
    }
  }

  getFormattedAge(): string {
    if (this.selectedUnit === 'years') {
      return this.pet ? Math.floor(this.pet.ageInMonths / 12) + ' anos' : '';
    } else {
      return this.pet ? this.pet.ageInMonths + ' meses' : '';
    }
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
