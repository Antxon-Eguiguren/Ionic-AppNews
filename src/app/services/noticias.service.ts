import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;

  headers = new HttpHeaders({
    'X-Api-key': this.apiKey
  });

  // Para el Infinite Scroll de las Noticias (Tab1)
  pageHeadline = 0;

  // Para el Infinite Scroll de las Noticias (Tab1)
  pageCategory = 0;
  categoriaActual = '';

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = this.apiUrl + query;
    return this.http.get<T>(query, { headers: this.headers });
  }

  getTopHeadlines(country: string) {
    this.pageHeadline++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=${country}&page=${this.pageHeadline}`);
  }

  getTopHeadlinesByCategory(country: string, category: string) {
    if (this.categoriaActual === category) {
      this.pageCategory++;
    } else {
      this.pageCategory = 1;
      this.categoriaActual = category;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=${country}&category=${this.categoriaActual}&page=${this.pageCategory}`);
  }

}
