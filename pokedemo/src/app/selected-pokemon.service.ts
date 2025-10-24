import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';




/* 
  This service manages the state of the selected Pokemon ID.
  It uses a BehaviorSubject to hold the current selected ID and allows components to subscribe to changes.
  It also uses the Observable pattern to notify subscribers when the selected ID changes.
*/
@Injectable({ providedIn: 'root' })
export class SelectedPokemonService {
  private selectedSubject = new BehaviorSubject<number | string>('');
  selected$: Observable<number | string> = this.selectedSubject.asObservable();

  setSelected(id: number | string) {
    this.selectedSubject.next(id);
  }

  getSelected(): number | string {
    return this.selectedSubject.getValue();
  }
}
