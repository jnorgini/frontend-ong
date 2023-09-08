import { Component } from '@angular/core';
import { Dog } from '../modelo/Dog';
import { DogService } from '../service/dog.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  // Objeto do tipo Dog
  Dog = new Dog();

  // Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  // Variável para visibilidade da tabela
  tabela: boolean = true;

  // JSON de Dogs
  Dogs: Dog[] = [];

  // Construtor
  constructor(private service: DogService) { }

  // Método de seleção
  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => this.Dogs = retorno);
  }

  // Método de cadastro
  cadastrar(): void {
    this.service.cadastrar(this.Dog)
      .subscribe(retorno => {

        // Cadastrar o dog no vetor
        this.Dogs.push(retorno);

        // Limpar formulário
        this.Dog = new Dog();

        // Mensagem
        alert('Pet cadastrado com sucesso!');
      });
  }

  // Método para selecionar um cliente específico
  selecionarDog(posicao: number): void {

    // Selecionar dog no vetor
    this.Dog = this.Dogs[posicao];

    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;
  }

  // Método para atualizar dogs
  editar(): void {
    this.service.editar(this.Dog)
      .subscribe(retorno => {
        // Obter posição do vetor onde está o dog
        let posicao = this.Dogs.findIndex(obj => {
          return obj.id == retorno.id;
        });

        // Alterar os dados do dog no vetor
        this.Dogs[posicao] = retorno;

        // Limpar formulário
        this.Dog = new Dog();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        alert('Pet alterado com sucesso!');

      });
  }

   // Método para remover dogs
   remover(): void {
    this.service.remover(this.Dog.id)
      .subscribe(retorno => {
        // Obter posição do vetor onde está o dog
        let posicao = this.Dogs.findIndex(obj => {
          return obj.id == this.Dog.id;
        });

        // Remover o dog do vetor
        this.Dogs.splice(posicao, 1);

        // Limpar formulário
        this.Dog = new Dog();

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
    this.Dog = new Dog();

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
