import { AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';
import { GifsListComponent } from "../../components/trending/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import type { Gif } from '../../interfaces/gifs.interface';
import { ScrollStateService } from '../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending',
  imports: [GifsListComponent],
  templateUrl: './trending.component.html',
})
export default class TrendingComponent implements AfterViewInit {
  

  private gifsService = inject( GifsService );
  private scrollStateService = inject( ScrollStateService );

  public images = computed<Gif[][]>(() => this.gifsService.trendingGroup());

  scrollSectionRef = viewChild<ElementRef<HTMLDivElement>>('groupSection');

  ngAfterViewInit(): void {
    const scrollSection  = this.scrollSectionRef()?.nativeElement;
    if( !scrollSection ) return;

      scrollSection.scrollTop = this.scrollStateService.getScrollState;
  }



  onScroll(event: Event): void {
   const scrollSection  = this.scrollSectionRef()?.nativeElement;
    if( !scrollSection ) return;

    const scrollTop = scrollSection.scrollTop;
    const clientHeight = scrollSection.clientHeight;
    const scrollHeight = scrollSection.scrollHeight;
   
    const isAtBotton = scrollTop + clientHeight + 300 >= scrollHeight;
     this.scrollStateService.setScrollState( this.scrollSectionRef()?.nativeElement.scrollTop ?? 0);

   
    if( isAtBotton ) {
        this.gifsService.loadTrendingGifs();
    }
    
   
   
   
    
  }

 
}
