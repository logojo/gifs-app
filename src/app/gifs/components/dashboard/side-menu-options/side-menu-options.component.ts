import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from 'src/app/gifs/services/gifs.service';

interface MenuOptions {
 icon: string;
 label: string;
 route: string;
 subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  private gifsService = inject( GifsService );

  history = computed(() => this.gifsService.searchHistoryKey());
  
  menuOptions : MenuOptions[] = [
    { icon: 'fa-solid fa-chart-line', label:'Trending', subLabel: 'Gifs populares', route: '/dashboard/trending'},
    { icon: 'fa-solid fa-magnifying-glass', label:'Search', subLabel: 'Buscar gifs', route: '/dashboard/search'}
  ]; 
}
