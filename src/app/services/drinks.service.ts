import { Injectable } from '@angular/core';
import { Drink } from '../model/drink';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment'; 
import Utils from '../utils'

@Injectable({
  providedIn: 'root'
})
export class DrinksService {   
  
  private apiUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

  getDrinks(): Observable<Drink[]>  {    
    return this.http.get<Drink[]>(`${this.apiUrl}/Drinks`)
    .pipe(      
      catchError(Utils.handleError('getDrinks', []))
    );
  } 
  
  getDrink(id: number): Observable<Drink> {    
    const url = `${this.apiUrl}/Drinks/${id}`;    
    return this.http.get<Drink>(url).pipe(      
      catchError(Utils.handleError<Drink>(`getDrink id=${id}`))
    );
  }

  addDrink (drink: Drink):  Observable<void> {      
    const url = `${this.apiUrl}/Drinks`;   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<void>(url, drink, { headers });
  }
 
  updateDrink(id: number, drink: Drink): Observable<void> {
    const url = `${this.apiUrl}/Drinks/${id}`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(url, drink, { headers });
  }

  deleteDrink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Drinks/${id}`);
  }
}