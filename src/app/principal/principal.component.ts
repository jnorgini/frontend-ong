import { Component, OnInit } from '@angular/core';
import { Pet } from '../modelo/Pet';
import { PetService } from '../service/pet.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  Pet = new Pet();
  btnCadastro = true;
  tabela = true;
  Pets: Pet[] = [];
  showDetailedInfo = false;

  constructor(
    private service: PetService
  ) {}

  formatarData(data: string): string {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, '0');
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataFormatada.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  toggleInfo(): void {
    this.showDetailedInfo = !this.showDetailedInfo;
  }

  ngOnInit(): void {
    this.selecionar();
  }

  selecionar(): void {
    this.service.selecionar().subscribe(retorno => {
      this.Pets = retorno;
      this.Pets.forEach(pet => {
        pet.summary = `Nome: ${pet.name}, ${
          pet.species ? `Espécie: ${pet.species}, ` : ''
        }${pet.gender ? `Gênero: ${pet.gender}, ` : ''}${
          pet.breed ? `Raça: ${pet.breed}, ` : ''
        }`;
        pet.birthdate = this.formatarData(pet.birthdate); // Formatar a data de nascimento
      });
    });
  }

  mostrarMaisInfos(i: number): void {
    const pet = this.Pets[i];
    const detalhes = `
      ${pet.size ? `Porte: ${pet.size}` : ''}
      ${pet.weight ? `Peso: ${pet.weight}` : ''}
      ${pet.neutered ? `Castrado: Sim` : `Castrado: Não`}
      ${pet.vaccinated ? `Vacinado: Sim` : `Vacinado: Não`}
      ${pet.description ? `Descrição: ${pet.description}` : ''}
    `;
    alert(`Informações detalhadas do pet ${pet.name}:\n${detalhes}`);
  }

  cadastrar(): void {
    this.service.cadastrar(this.Pet).subscribe(retorno => {
      this.Pets.push(retorno);
      this.Pet = new Pet();
      alert('Pet cadastrado com sucesso!');
    });
  }

  selecionarPet(posicao: number): void {
    this.Pet = this.Pets[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }

  editar(): void {
    this.service.editar(this.Pet).subscribe(retorno => {
      const posicao = this.Pets.findIndex(obj => obj.id == retorno.id);
      this.Pets[posicao] = retorno;
      this.Pet = new Pet();
      this.btnCadastro = true;
      this.tabela = true;
      alert('Pet alterado com sucesso!');
    });
  }

  remover(): void {
    this.service.remover(this.Pet.id).subscribe(() => {
      const posicao = this.Pets.findIndex(obj => obj.id == this.Pet.id);
      this.Pets.splice(posicao, 1);
      this.Pet = new Pet();
      this.btnCadastro = true;
      this.tabela = true;
      alert('Pet removido com sucesso!');
    });
  }

  cancelar(): void {
    this.Pet = new Pet();
    this.btnCadastro = true;
    this.tabela = true;
  }
}
