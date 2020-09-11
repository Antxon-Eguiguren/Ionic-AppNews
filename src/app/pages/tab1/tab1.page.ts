import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  articles: Article[] = [];

  constructor(private noticiasSrv: NoticiasService) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadDataInfiniteScroll(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    setTimeout(() => {
      this.noticiasSrv.getTopHeadlines(environment.country).subscribe(response => {
        if (response.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.articles.push(...response.articles);
      });

      if (event) {
        event.target.complete();
      }

    }, 2000);
  }

}
