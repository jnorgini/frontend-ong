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
export class PetInfosComponent  {
  pet = <Pet>{};
  infoMode: boolean = false;
  editMode: boolean = false;

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
          this.editMode = true;
      }
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
