import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { SkeletonCardComponent } from './skeleton-card/skeleton-card.component';

@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent,
    SkeletonCardComponent
  ],
  exports: [
    NoticiasComponent,
    SkeletonCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
