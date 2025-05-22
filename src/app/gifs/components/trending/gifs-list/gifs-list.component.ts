import { Component, input } from '@angular/core';
import { GifsItemComponent } from "../gifs-item/gifs-item.component";
import { Gif } from 'src/app/gifs/interfaces/gifs.interface';

@Component({
  selector: 'gifs-list',
  imports: [GifsItemComponent],
  templateUrl: './gifs-list.component.html',
})
export class GifsListComponent {
  images = input.required<Gif[][]>();
  //images = input.required<Gif[]>();

  constructor() {
   //console.log(this.images());
  }
}
