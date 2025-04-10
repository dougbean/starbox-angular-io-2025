import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DrinksService } from './services/drinks.service';
import { IngredientsService } from './services/ingredients.service';
import { DrinksComponent } from './drinks/drinks.component';
import { SelectedDrinkComponent } from './selected-drink/selected-drink.component';
import { MessageDirective } from './directives/message.directive';
import { ToastrService } from './services/toastr.service';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrinksRecipeComponent } from './drinks-recipe/drinks-recipe.component';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { EditDrinkComponent } from './edit-drink/edit-drink.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    DrinksComponent,
    SelectedDrinkComponent,
    MessageDirective,  
    HeaderComponent,
    FooterComponent,
    IngredientsComponent,
    DrinksRecipeComponent,
    AddDrinkComponent,
    AddIngredientComponent,   
    EditDrinkComponent,
    EditIngredientComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ToastrService, DrinksService, IngredientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
