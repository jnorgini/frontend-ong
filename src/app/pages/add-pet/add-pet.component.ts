import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/Pet';
import { MatDialog } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {

  pets: Pet[] = [];
  pet = new Pet();

  constructor(
    private service: PetService, private toastr:
      ToastrService, private router: Router, private dialog: MatDialog, private route: ActivatedRoute) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
    })
  }


  create(): void {
    this.service.create(this.pet)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar cadastrar novo pet. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }), tap(() => {
          this.toastr.success('Novo pet adicionado com sucesso!')
        })
      ).subscribe(res => {
        this.pets.push(res);
      })

  }

  cancel() {
    this.dialog.closeAll();
    this.service.filter('Click');
  }
  


}

