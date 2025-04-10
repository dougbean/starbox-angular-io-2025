import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDrinkComponent } from './selected-drink.component';

describe('SelectedDrinkComponent', () => {
  let component: SelectedDrinkComponent;
  let fixture: ComponentFixture<SelectedDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
