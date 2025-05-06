import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import {Router} from '@angular/router'; 
import { Ingredient } from '../model/ingredient';  
import { Drink } from '../model/drink';  
import { IngredientsService } from '../services/ingredients.service';
import { DrinksService } from '../services/drinks.service';
import { ToastrService } from '../services/toastr.service';
import Utils from '../utils'

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.css']
})
export class AddDrinkComponent implements OnInit { 
  duplicateSelection: boolean;
  message: String;
  created: Drink = new Drink();
  ingredientList:Ingredient[];   
 
  constructor(private ingredientService:IngredientsService, 
      private drinksService:DrinksService, 
      private toastrService:ToastrService,
      private formBuilder: FormBuilder,
      private router:Router) { }   
  
  ngOnInit() { 
    this.getIngredientsFromApi();
  }
  
  getIngredientsFromApi(): void {
    const observable =  this.ingredientService.getIngredients()
              .subscribe(ingredients => this.ingredientList = ingredients); 
  }     
  
  drinkForm = this.formBuilder.group({    
    name: ['', [Validators.required]],  
    ingredients: this.formBuilder.array([]) 
  });

  get ingredients() {
    return this.drinkForm.get('ingredients') as FormArray;
  }
 
  addIngredientControlGroup() {    
    const ingredientControlGroup = this.formBuilder.group({     
      quantity: [1], //default to one     
      id: [''],  
      name: ['']  //this is needed by the WebApi, though we leave it empty.
    });

    // Add the new control group to the FormArray    
    this.ingredients.push(ingredientControlGroup);
  }

  // Remove a control group from the FormArray
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

    const invalidSection = Utils.isIngredientSelectionValid(drink);
    if(invalidSection){
      this.message = "You have an invalid ingredient selection."
      return 
    }else{
      this.message = "";       
    } 
    
    const hasDuplicates = Utils.checkIngredientsForDuplicates(drink);
    if(hasDuplicates){
      this.message = "You have a duplicate ingredient selection. Please change one."
    }else{
      this.message = "";   
      this.addDrink(drink);   
    }
  }

  private GetDrinkObjectFromForm() {
    const json = JSON.stringify(this.drinkForm.value);
    const drink = JSON.parse(json);
    return drink;
  }

  private addDrink(drink: any) {
    this.drinksService.addDrink(drink).subscribe({
      next: () => {
        this.toastrService.success('drink was added');
        //reset form
        this.drinkForm.reset();       
        this.drinkForm.setControl('ingredients', this.formBuilder.array([]));                     
      },
      error: (err) => {
        console.error('Error adding an ingredient:', err);
        this.toastrService.error("error occurred adding drink");
      }
    });
  }

  onOptionsSelected(event: Event): void {   
    const drink = this.GetDrinkObjectFromForm();  
    const hasDuplicates = Utils.checkIngredientsForDuplicates(drink);
    if(hasDuplicates){
      this.message = "You have a duplicate ingredient selection. Please change one."
    }else{
      this.message = "";   
    }
  }
}