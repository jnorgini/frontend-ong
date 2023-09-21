import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/Pet';
import { PetService } from 'src/app/services/pet.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPetComponent } from '../add-pet/add-pet.component';
import { ActivatedRoute } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets: Pet[] = [];
  pet = new Pet();
  tabela: boolean = true;

  openAddPetForm() {
    this.dialog.open(AddPetComponent);
  }

  displayedColumns: string[] = ['id', 'name', 'species', 'gender', 'birthdate'
    , 'breed', 'size', 'weight', 'neutered', 'microchip', 'vaccination', 'description', 'acoes'];

  constructor(private service: PetService, private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.refreshNeeded$.subscribe(() => {
      this.findAll();
    });

    this.findAll();

  }
  private findAllPets() {
    this.findAll();

  }

  findAll() {
    this.service.findAll().subscribe(res => {
      console.log(res);
      this.pets = res;
    })
  }
  

}