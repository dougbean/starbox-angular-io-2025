import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksRecipeComponent } from './drinks-recipe.component';

describe('DrinksRecipeComponent', () => {
  let component: DrinksRecipeComponent;
  let fixture: ComponentFixture<DrinksRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrinksRecipeComponent]
    });
    fixture = TestBed.createComponent(DrinksRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
