import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('ingredientForm') form!: NgForm;

  constructor(private ingredientService:IngredientsService, private toastrService:ToastrService) {}

  onSubmit() {    
    this.ingredientService.addIngredient(this.ingredient).subscribe({
      next: () => {                
        this.toastrService.success('ingredient was added');
        this.form.reset()
      },
      error: (err) => {
        console.error('Error adding an ingredient:', err);
        this.toastrService.error("error occurred adding ingredient");
      }
    });   
  }
}
