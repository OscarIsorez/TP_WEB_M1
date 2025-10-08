import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
