export class PetModel {
    id: number = 0;
    name: string = '';
    species: string = '';
    gender: string = '';
    ageInMonths: number = 0;
    breed: string = '';
    size: string = '';
    weight: number | null = null; 
    neutered: boolean = false;
    microchip: number = 0;
    vaccination: string = '';
    description: string = '';
}