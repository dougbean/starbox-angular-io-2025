import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient';
import { IngredientsService } from '../services/ingredients.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients:Ingredient[];
  amount:number = 25; //default   

  constructor(private ingredientService:IngredientsService, 
                      private toastrService:ToastrService) { }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients(): void {
    // this.ingredientService.getIngredients()
    //           .subscribe(ingredients => this.ingredients = ingredients);     
    this.ingredientService.getIngredients()
    .subscribe(ingredients => {
        this.ingredients = ingredients
        this.sortIngredientsByName();
    });      
   } 
   
   sortIngredientsByName(): void {
    this.ingredients.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {      
        return -1;  // a comes before b
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {        
        return 1;   // b comes before a
      } else {        
        return 0;   // a and b are equal
      }
    });
  }
    
  onDelete(id: number): void {
    this.ingredientService.deleteIngredient(id).subscribe({
      next: () => {         
        this.toastrService.success('ingredient was deleted');
        this.getIngredients();
      },
      error: (err) => {
        let errorMsg = "Error occurred deleting ingredient. An ingredient can't be deleted if it used by a drink."
        console.error(errorMsg, err);        
        this.toastrService.error(errorMsg);
      }
    });     
  }     

  onSubmit(): void { 
   this.restockIngredients();          
  }   

  private restockIngredients() {
    this.ingredientService.restockIngredients(this.amount).subscribe({
      next: () => {
        this.toastrService.success('ingredients were restocked.');
        this.getIngredients(); //refresh the ingredient list
      },
      error: (err) => {
        let msg = 'Error restocking ingredients';
        console.error(msg, err);
        this.toastrService.error(msg);
      }
    });
  }
}
