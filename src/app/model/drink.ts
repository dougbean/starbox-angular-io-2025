import { Ingredient } from './ingredient';

export class Drink {
  id: number;
  name: string;
  price: number;
  ingredients:Ingredient[]; 
}
