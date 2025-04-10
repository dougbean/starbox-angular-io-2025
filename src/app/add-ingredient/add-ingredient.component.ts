import { Component } from '@angular/core';
import { Ingredient } from '../model/ingredient';
import { IngredientsService } from '../services/ingredients.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent {
  ingredient: Ingredient = new Ingredient();

  constructor(private ingredientService:IngredientsService, private toastrService:ToastrService) {}

  onSubmit() {    
    this.ingredientService.addIngredient(this.ingredient).subscribe({
      next: () => {                
        this.toastrService.success('ingredient was added');
      },
      error: (err) => {
        console.error('Error adding an ingredient:', err);
        this.toastrService.error("error occurred adding ingredient");
      }
    });   
  }
}
