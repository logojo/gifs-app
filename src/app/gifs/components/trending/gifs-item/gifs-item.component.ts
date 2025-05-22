import { Component, input } from '@angular/core';
import type { Gif } from 'src/app/gifs/interfaces/gifs.interface';

@Component({
  selector: 'gifs-item',
  imports: [],
  templateUrl: './gifs-item.component.html',
})
export class GifsItemComponent {
  images = input.required<Gif[]>();
  //image = input.required<string>();
}
