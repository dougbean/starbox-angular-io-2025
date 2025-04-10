import { Observable } from 'rxjs';
import { of } from 'rxjs'; //simulates getting data from a http call

export default abstract class Utils {
   
    /**
	* Handle Http operation that failed.
	* Let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	public static handleError<T> (operation = 'operation', result?: T) { 
		return (error: any): Observable<T> => {		
		console.error(error);						
		// Let the app keep running by returning an empty result.		
		return of(result as T);
		};
	}

	public static isIngredientSelectionValid(drink: any) {
		var invalidSection = false;
		drink.ingredients.forEach(function (item: { id: number; }) {
		  if (Number(item.id) === 0) {
			invalidSection = true;
		  }
		});
		return invalidSection;
	  }	

	  public static checkIngredientsForDuplicates(drink: any) {
		var hasDuplicates = false;
		var dupes = this.GetDuplicatedIngredients(drink);

		const isEmpty = dupes.length === 0; // true
		if (!isEmpty) {
		  hasDuplicates = true;
		} 
		return hasDuplicates;
	  }
	  
	  private static GetDuplicatedIngredients(drink: any) {
		const seen = new Set();
		const duplicates = new Set();
	
		drink.ingredients.forEach(function (item: { id: number; }) {
		  if (seen.has(item.id)) {       
			duplicates.add(item.id.toString());
		  } else {
			seen.add(item.id.toString());        
		  }     
		});		
		return [...duplicates];
	  } 
  }