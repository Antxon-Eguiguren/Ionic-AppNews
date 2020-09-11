import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { environment } from '../../../environments/environment';
import { Article } from '../../interfaces/interfaces';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  @ViewChild(IonSegment) segment: IonSegment;

  articles: Article[] = [];

  constructor(private noticiasSrv: NoticiasService) { }

  ngOnInit() {
    this.cargarNoticias(this.categories[0]);
  }

  loadDataInfiniteScroll(event) {
    this.cargarNoticias(this.segment.value, event);
  }

  cambioCategoria(event) {
    this.articles = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(category: string, event?) {
    this.noticiasSrv.getTopHeadlinesByCategory(environment.country, category).subscribe(response => {
      this.articles.push(...response.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

}
