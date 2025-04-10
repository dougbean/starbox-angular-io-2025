import { Component, OnInit,  ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Drink } from '../model/drink';
import { DrinksService } from '../services/drinks.service';
import { MessageDirective } from '../directives/message.directive';
import { SelectedDrinkComponent } from '../selected-drink/selected-drink.component';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {

  drinks:Drink[];
  selectedDrink:Drink;  
    
  @ViewChild(MessageDirective) messageHost: MessageDirective;
  
  constructor(private drinksService:DrinksService, 
    private componentFactoryResolver: ComponentFactoryResolver) { 
}

  ngOnInit() {
    this.getDrinks();   
  }

  getDrinks(): void {
    var observable =  this.drinksService.getDrinks().subscribe(drinks => this.drinks = drinks);     
   }
  
  selectDrink(selection: Drink): void {   
    this.selectedDrink = selection;      
    this.loadComponent();  
  }  

  loadComponent() { 
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(SelectedDrinkComponent);
        
    let viewContainerRef = this.messageHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.selectedDrink = this.selectedDrink;
    componentRef.instance.drinkList = this.drinks;
  }
}
