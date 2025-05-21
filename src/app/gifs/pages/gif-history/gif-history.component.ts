import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/trending/gifs-list/gifs-list.component";
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  private route = inject( ActivatedRoute );
  private gifsService = inject( GifsService );

 //* obteniendo imagenes desde la peticion http
  // public historyGifs = toSignal(
  //   this.route.params.pipe(
  //     switchMap(({key}) => this.gifsService.searchGifs(key).pipe(
  //       map((gifs) => this.images.set(gifs) )
  //     ) )
  //   )
  // );

  //* obteniendo imagenes desde la señal que guarda el historial
  public images = toSignal<Gif[]>(
    this.route.params.pipe(
      map(({key}) => {
           return  this.gifsService.searchHistory()[key];
        }
       )
    ) 
  );

}
