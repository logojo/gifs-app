import { Component, input } from '@angular/core';

@Component({
  selector: 'gifs-item',
  imports: [],
  templateUrl: './gifs-item.component.html',
})
export class GifsItemComponent {
  //images = input.required<string[]>();
  image = input.required<string>();
}
