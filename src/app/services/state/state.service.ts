import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  modalState = new BehaviorSubject(false);
  modal$ = this.modalState.asObservable()
  constructor() { }
}
