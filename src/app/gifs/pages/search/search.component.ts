import { Component, computed, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/trending/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { LoadingComponent } from "../../components/loading/loading.component";
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'app-search',
  imports: [GifsListComponent, LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export default class SearchComponent {
  private gifsService = inject( GifsService );

  images = signal<Gif[]>([]);
  loading = computed(() => this.gifsService.loading());

  onSearch( query : string ) {
   this.gifsService.searchGifs(query).subscribe((res) => {
      this.images.set(res);
   });
    
  }
}
