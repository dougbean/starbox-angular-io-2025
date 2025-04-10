import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient'; 
import { IngredientsService } from '../services/ingredients.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {
  ingredient: Ingredient = new Ingredient();

  constructor(private ingredientService:IngredientsService, private toastrService:ToastrService) { }   
 
  ngOnInit(): void {  
     // Access the data passed via routerLink state
     this.ingredient = history.state.ingredient;  
   }

   onSubmit() {       
    this.ingredientService.editIngredient(this.ingredient.id, this.ingredient).subscribe({
      next: () => {              
        this.toastrService.success('ingredient was edited');
      },
      error: (err) => {
        console.error('Error adding an ingredient:', err);
      }
    });   
  }
}
