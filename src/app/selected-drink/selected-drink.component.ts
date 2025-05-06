import { Component, OnInit, Input } from '@angular/core';
import { Drink } from '../model/drink';
import { DrinksService } from '../services/drinks.service';

@Component({
  selector: 'app-selected-drink',
  templateUrl: './selected-drink.component.html',
  styleUrls: ['./selected-drink.component.css']
})

export class SelectedDrinkComponent implements OnInit {
  
  @Input() selectedDrink: Drink; 
  @Input() drinkList: Drink[]; 
  drink: Drink;  

  constructor(private drinkService:DrinksService) { }                

  ngOnInit() {
    this.getDrink(this.selectedDrink.id);        
  }
    
  getDrink(id: number): void {     
    const observable = this.drinkService.getDrink(id)
      .subscribe(drink => this.drink = drink);      
  }

  getMessage(){    
    let message = '';
    //console.log(JSON.stringify(this.drink));
    if(this.drink.id > 0) {
       message = 'Thank you! Please enjoy your ' + this.drink.name + '!';
    }else{      
      let oneDrink = this.drinkList.filter(aDrink => aDrink.id == this.selectedDrink.id);
      message = 'Sorry, we are temporarily unable to dispense ' 
                + oneDrink[0].name + '.  Please make another selection.';
    }
    return message;
  }
}
