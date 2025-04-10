import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Drink } from '../model/drink';
import { Ingredient } from '../model/ingredient'; 
import { DrinksService } from '../services/drinks.service';
import { IngredientsService } from '../services/ingredients.service';
import { ToastrService } from '../services/toastr.service';
import Utils from '../utils'

@Component({
  selector: 'app-edit-drink',
  templateUrl: './edit-drink.component.html',
  styleUrls: ['./edit-drink.component.css']
})
export class EditDrinkComponent implements OnInit {
 selectedDrink: Drink; 
 ingredientList:Ingredient[];    
 duplicateSelection: boolean;
 message: String; 
 drinkForm: FormGroup;

 constructor(private ingredientService:IngredientsService, 
    private drinksService:DrinksService, 
    private toastrService:ToastrService,
    private formBuilder: FormBuilder) { }   

 ngOnInit(): void {  
    this.getIngredientsFromApi();

    // Access the data passed via routerLink state
    this.selectedDrink = history.state.drink;  

    this.initializeDrinkFormGroup();    
    this.initializeIngredientControlArray();    
  }

  getIngredientsFromApi(): void {
    var observable =  this.ingredientService.getIngredients()
              .subscribe(ingredients => this.ingredientList = ingredients); 
   }   

  private initializeDrinkFormGroup() {
    this.drinkForm = this.formBuilder.group({
      name: [this.selectedDrink.name, [Validators.required]],
      id: [this.selectedDrink.id],
      ingredients: this.formBuilder.array([])
    });
  }

  private initializeIngredientControlArray() {
    for (var i = 0; i < this.selectedDrink.ingredients.length; i++) {
      const controlGroup = this.formBuilder.group({
        name: [this.selectedDrink.ingredients[i].name],       
        quantity: [this.selectedDrink.ingredients[i].quantity],
        id: [this.selectedDrink.ingredients[i].id],
      });

      this.ingredients.push(controlGroup);
    }
  }

  //make control array directly accessible
  get ingredients() {
    return this.drinkForm.get('ingredients') as FormArray;
  }

  // Add a new control group to the FormArray
  addIngredientControlGroup() {    
    const ingredientControlGroup = this.formBuilder.group({     
      quantity: [1], //default one ingredient     
      id: [''],  
      name: ['']  //this is needed by the WebApi, though we leave it empty.
    });
    this.ingredients.push(ingredientControlGroup);
  }

  //Remove a control group from the FormArray
  removeIngredientControlGroup(index: number) {   
    this.ingredients.removeAt(index);
  }

  onSubmit() {    
    const drink = this.GetDrinkObjectFromForm();       

   if(drink.ingredients.length === 0){
      this.message = "At least one ingredient is required."
      return;
    }else{
      this.message = "";      
    }    

    var invalidSection = Utils.isIngredientSelectionValid(drink);
    if(invalidSection){
      this.message = "You have an invalid ingredient selection."
      return 
    }else{
      this.message = "";       
    } 
        
    var hasDuplicates = Utils.checkIngredientsForDuplicates(drink);
    if(hasDuplicates){
      this.message = "You have a duplicate ingredient selection. Please change one."
    }else{
      this.message = "";   
      this.updateDrink(drink);
    }
  }

  private updateDrink(drink: any) {
    this.drinksService.updateDrink(drink.id, drink).subscribe({
      next: () => {                
        this.toastrService.success('drink was edited');
      },
      error: (err) => {
        console.error('Error editing a drink:', err);
        this.toastrService.error("error occurred editing drink");
      }
    });
  }

  private GetDrinkObjectFromForm() {
    var json = JSON.stringify(this.drinkForm.value);
    const drink = JSON.parse(json);
    return drink;
  }

  onOptionsSelected(event: Event): void {       
    const drink = this.GetDrinkObjectFromForm();            
    var hasDuplicates = Utils.checkIngredientsForDuplicates(drink);
    if(hasDuplicates){
        this.message = "You have a duplicate ingredient selection. Please change one."
    }else{
      this.message = "";   
    }        
  }
}
