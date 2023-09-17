import { Component, OnInit } from '@angular/core';
import { Pet } from '../models/Pet';
import { PetService } from '../services/pet.service';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private service: PetService, private toastr: ToastrService, private router: Router) { }

  mostrarMaisInformacoes(pet: Pet): void {
    const mensagem = `Mais informações sobre o pet: ${pet.name}
    Idade: ${pet.age}
    Peso: ${pet.weight}
    Castrado: ${pet.neutered ? 'Sim' : 'Não'}
    Vacinado: ${pet.vaccinated ? 'Sim' : 'Não'}
    Descrição: ${pet.description}
    `;

    alert(mensagem);
  }
  

  // Objeto do tipo Dog
  Pet = new Pet();

  // Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  // Variável para visibilidade da tabela
  tabela: boolean = true;

  // JSON de Pets
  Pets: Pet[] = [];


  // Método de seleção
  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => this.Pets = retorno);
  }

  // Método de cadastro
  cadastrar(): void {
    this.service.cadastrar(this.Pet)
    .pipe(
      catchError((error) => {
        this.toastr.warning('Erro ao tentar cadastrar novo pet. Verifique sua conexão com a internet e tente novamente.');
        throw error;
      }), tap(() => {
        this.toastr.success('Novo pet cadastrado com sucesso!')
      })
    )
      .subscribe(retorno => {

        // Cadastrar o dog no vetor
        this.Pets.push(retorno);

        // Limpar formulário
        this.Pet = new Pet();

      });
  }

  // Método para selecionar um cliente específico
  selecionarPet(posicao: number): void {

    // Selecionar dog no vetor
    this.Pet = this.Pets[posicao];

    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;
  }

   // Método para atualizar pets
   editar(): void {
    this.service.editar(this.Pet)
    .pipe(
      catchError((error) => {
        this.toastr.warning('Erro ao tentar editar o pet. Verifique sua conexão com a internet e tente novamente.');
        throw error;
      }), tap(() => {
        this.toastr.success('Pet atualizado com sucesso!')
      })
    )
    .subscribe(retorno => {

      // Obter posição do vetor onde está o pet
      let posicao = this.Pets.findIndex(obj => {
        return obj.id == retorno.id;
      });

      // Alterar os dados do pet no vetor
      this.Pets[posicao] = retorno;

      // Limpar formulário
      this.Pet = new Pet();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

    })
   }

  // Método para atualizar dogs
  remover(): void {
    this.service.remover(this.Pet.id)
    .pipe(
      catchError((error) => {
        this.toastr.warning('Erro ao tentar excluir cadastro de pet. Verifique sua conexão com a internet e tente novamente.');
        throw error;
      }), tap(() => {
        this.toastr.success('Cadastro de pet removido com sucesso!')
      })
    )
      .subscribe(retorno => {
        // Obter posição do vetor onde está o dog
        let posicao = this.Pets.findIndex(obj => {
          return obj.id == this.Pet.id;
        });

        // Remover o dog do vetor
        this.Pets.splice(posicao, 1);

        // Limpar formulário
        this.Pet = new Pet();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

      });
  }


  // Método para cancelar
  cancelar(): void {

    // Limpar o formulário
    this.Pet = new Pet();

    // Visibilidade dos botões
    this.btnCadastro = true;

    // Visibilidade da tabela
    this.tabela = true;
  }

  // Método de inicialização
  ngOnInit() {
    this.selecionar();
  }

  routeLogin() {
    this.router.navigate(['/login']);
  }

}