import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  private scrollState = signal<number>(0);

  setScrollState( scrollTop: number ) {
    this.scrollState.set( scrollTop );   
  }

  get getScrollState() {
    return this.scrollState();
  }


}
