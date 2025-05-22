import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap, throwError } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import type { Gif } from '../interfaces/gifs.interface';

import { GifMapper } from '../mappers/gif.mapper';

//* Tipado para un  objeto donde sus llaves son dinamicas
// Record<string. Gif[]>{

// }

//*Cargando local storage
const  loadFromLocalStorage = () : Record<string, Gif[]> => {
  //todo: al hacer esto es indispensable crear codigo para verificar que lo que viene de local storage sea del tipo correcto
  const gifs =  localStorage.getItem('gifs');
  return gifs ? JSON.parse(gifs) : {};
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject( HttpClient );
  private environment = environment;

  public trendings = signal<Gif[]>([]);
  public loading = signal(false);

  public trendingGroup = computed<Gif[][]>(() => {
    const groups = [];
    
    for( let i = 0; i < this.trendings().length; i += 3 ) {
      groups.push( this.trendings().slice(i, i + 3) );
    }
  
    return groups ;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));
  page = signal(1);

  constructor() {
    this.loadTrendingGifs(); 
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('gifs', JSON.stringify(this.searchHistory())); 
  });

  loadTrendingGifs() {
    if( this.loading() ) return;
    
    this.loading.set( true );
    this.http.get<GiphyResponse>(`${this.environment.apiUrl}/trending`, {
      params: {
        api_key: this.environment.apiKey,
        limit: 20,
        offset: this.page() * 20, 
      }
    }).subscribe((res) => {
      
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
       this.trendings.update((current) => [...current , ...gifs]);
      this.page.update( (page) => page + 1);
       this.loading.set(false);
    });

  }

  searchGifs( query: string )  {    
    
     this.loading.set( true );
    return this.http.get<GiphyResponse>(`${this.environment.apiUrl}/search`, {
      params: {
        api_key: this.environment.apiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map(({data}) => {
       this.loading.set(false);
       return GifMapper.mapGiphyItemsToGifArray(data);
    }),
    tap( items => {
      this.searchHistory.update(( history ) => ({ ...history, [query.toLowerCase()] : items}) );
    }),
    catchError(error => { 
      return throwError(() => {
        this.loading.set(false);
        return error.error.message
      }) 
      })
    );
  }
}
