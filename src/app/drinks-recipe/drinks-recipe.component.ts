import { Component, OnInit} from '@angular/core';
import { Drink } from '../model/drink';
import { DrinksService } from '../services/drinks.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-drinks-recipe',
  templateUrl: './drinks-recipe.component.html',
  styleUrls: ['./drinks-recipe.component.css']
})
export class DrinksRecipeComponent implements OnInit {
  drinks:Drink[];
  selectedDrink:Drink;      
  
  constructor(private drinksService:DrinksService, private toastrService:ToastrService) { }
   
  ngOnInit() {
    this.getDrinks();   
  }

  getDrinks(): void {
    var observable = this.drinksService.getDrinks().subscribe(drinks => this.drinks = drinks);     
   }  

  onDelete(id: number): void {
    this.drinksService.deleteDrink(id).subscribe({
      next: () => {
        // Refresh the drink list after deletion
        this.getDrinks();       
        this.toastrService.success('drink was deleted');
      },
      error: (err) => {
        console.error('Error deleting the drink:', err);
        this.toastrService.error("error occurred deleting drink");
      }
    });     
  }  
}
