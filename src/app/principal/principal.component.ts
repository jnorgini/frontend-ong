import { Component } from '@angular/core';
import { Pet } from '../modelo/Pet';
import { PetService } from '../service/pet.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  formatarData(data: string): string {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  // Objeto do tipo Dog
  Pet = new Pet();

  // Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  // Variável para visibilidade da tabela
  tabela: boolean = true;

  // JSON de Pets
  Pets: Pet[] = [];

  // Construtor
  constructor(private service: PetService) { }

  // Método de seleção
  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => this.Pets = retorno);
  }

  // Método de cadastro
  cadastrar(): void {
    this.service.cadastrar(this.Pet)
      .subscribe(retorno => {

        // Cadastrar o dog no vetor
        this.Pets.push(retorno);

        // Limpar formulário
        this.Pet = new Pet();

        // Mensagem
        alert('Pet cadastrado com sucesso!');
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

  // Método para atualizar dogs
  editar(): void {
    this.service.editar(this.Pet)
      .subscribe(retorno => {
        // Obter posição do vetor onde está o dog
        let posicao = this.Pets.findIndex(obj => {
          return obj.id == retorno.id;
        });

        // Alterar os dados do dog no vetor
        this.Pets[posicao] = retorno;

        // Limpar formulário
        this.Pet = new Pet();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        alert('Pet alterado com sucesso!');

      });
  }

  // Método para atualizar dogs
  remover(): void {
    this.service.remover(this.Pet.id)
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

        // Mensagem
        alert('Pet removido com sucesso!');

      });
  }


   

  // Método para cancelar
  cancelar():void{

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

}