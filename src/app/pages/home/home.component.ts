import { Component, OnInit } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/Pet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: PetService, private toastr: ToastrService, private router: Router) { }

  showMoreInfo(pet: Pet): void {
    const msg = `Mais informações sobre o pet: ${pet.name}
    Idade: ${pet.age}
    Peso: ${pet.weight}
    Castrado: ${pet.neutered ? 'Sim' : 'Não'}
    Vacinado: ${pet.vaccinated ? 'Sim' : 'Não'}
    Descrição: ${pet.description}
    `;

    alert(msg);
  }

  Pet = new Pet();
  showButton: boolean = true;
  table: boolean = true;
  Pets: Pet[] = [];

  findAll(): void {
    this.service.findAll()
      .subscribe(retorno => this.Pets = retorno);
  }

  add(): void {
    this.service.add(this.Pet)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar cadastrar novo pet. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }), tap(() => {
          this.toastr.success('Novo pet cadastrado com sucesso!')
        })
      )
      .subscribe(retorno => {
        this.Pets.push(retorno);

        this.Pet = new Pet();

      });
  }

  findById(id: number): void {
    this.Pet = this.Pets[id];
    this.showButton = false;
    this.table = false;
  }

  update(): void {
    this.service.update(this.Pet)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar editar o pet. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }), tap(() => {
          this.toastr.success('Pet atualizado com sucesso!')
        })
      )
      .subscribe(retorno => {

        let posicao = this.Pets.findIndex(obj => {
          return obj.id == retorno.id;
        });


        this.Pets[posicao] = retorno;

        this.Pet = new Pet();

        this.showButton = true;

        this.table = true;

      })
  }

  remove(): void {
    this.service.remove(this.Pet.id)
      .pipe(
        catchError((error) => {
          this.toastr.warning('Erro ao tentar excluir cadastro de pet. Verifique sua conexão com a internet e tente novamente.');
          throw error;
        }), tap(() => {
          this.toastr.success('Cadastro de pet removido com sucesso!')
        })
      )
      .subscribe(retorno => {

        let posicao = this.Pets.findIndex(obj => {
          return obj.id == this.Pet.id;
        });

        this.Pets.splice(posicao, 1);

        this.Pet = new Pet();

        this.showButton = true;

        this.table = true;

      });
  }

  cancel(): void {
    this.Pet = new Pet();

    this.showButton = true;

    this.table = true;
  }


  ngOnInit() {
    this.findAll();
  }

  routeLogin() {
    this.router.navigate(['/login']);
  }

}