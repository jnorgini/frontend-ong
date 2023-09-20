import { Component } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PetService } from 'src/app/services/pet.service';
import { Pet } from 'src/app/models/Pet';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pet-add-edit',
  templateUrl: './pet-add-edit.component.html',
  styleUrls: ['./pet-add-edit.component.css']
})
export class PetAddEditComponent {

  constructor(
    private service: PetService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  formattedBirthdate: string = '';

  Pet = new Pet();
  showButton: boolean = true;
  table: boolean = true;
  Pets: Pet[] = [];
  editMode: boolean = false;

  // Função para entrar no modo de edição
  edit(): void {
    this.editMode = true;
  }

  // Função para sair do modo de edição e cancelar a edição
  cancelEdit(): void {
    this.editMode = false;
    this.Pet = new Pet();
  }

  // Função para salvar as alterações após a edição
  saveEdit(): void {
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
        this.editMode = false;
      })
  }

  // Função para remover o pet
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

  cancel(): void {
    this.Pet = new Pet();

    this.showButton = true;

    this.table = true;
  }


  ngOnInit() {
    this.findAll();
  }

}
