import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinksComponent } from './drinks/drinks.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { DrinksRecipeComponent } from './drinks-recipe/drinks-recipe.component'; 
import { AddDrinkComponent } from './add-drink/add-drink.component'; 
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component'; 
import { EditDrinkComponent } from './edit-drink/edit-drink.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';

const routes: Routes = [
  { path: '', redirectTo: '/drinks', pathMatch: 'full' },
  { path: 'drinks', component: DrinksComponent }, 
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'recipes', component: DrinksRecipeComponent },
  { path: 'add-drink', component: AddDrinkComponent }, 
  { path: 'add-ingredient', component: AddIngredientComponent },  
  { path: 'edit-drink', component: EditDrinkComponent }, 
  { path: 'edit-ingredient', component: EditIngredientComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
