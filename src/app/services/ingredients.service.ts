import { Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environment';
import Utils from '../utils'

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private apiUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]>  {
    return this.http.get<Ingredient[]>(`${this.apiUrl}/Ingredients`)
    .pipe(      
      catchError(Utils.handleError('getIngredients', []))
    );
  }

  restockIngredients (amount: number): Observable<void> {            
    const url = `${this.apiUrl}/Ingredients/update-amounts?amount=${amount}`;   
    return this.http.put<void>(url, {});
  }
  
  addIngredient (ingredient: Ingredient):Observable<void>  {   
    const url = `${this.apiUrl}/Ingredients`;   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });   
    return this.http.post<void>(url, ingredient, { headers });
  }  

  editIngredient (id: number, ingredient: Ingredient):Observable<void>  {      
    const url = `${this.apiUrl}/Ingredients/${id}`;     
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.put<void>(url, ingredient, { headers });
  }

  deleteIngredient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Ingredients/${id}`);
  }
}
