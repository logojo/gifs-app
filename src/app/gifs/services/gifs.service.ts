import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';

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
  http = inject( HttpClient );
  environment = environment;

  trendings = signal<Gif[]>([]);
  loading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));


  constructor() {
    this.loadTrendingGifs();
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('gifs', JSON.stringify(this.searchHistory())); 
  });

  loadTrendingGifs() {

    this.http.get<GiphyResponse>(`${environment.apiUrl}/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: 20
      }
    }).subscribe((res) => {
      
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
      this.trendings.set(gifs);
       this.loading.set(false);
    });

  }

  searchGifs( query: string )  {    
     this.loading.set( true );
    return this.http.get<GiphyResponse>(`${environment.apiUrl}/search`, {
      params: {
        api_key: environment.apiKey,
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
