import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() article: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, private dataLocalSrv: DataLocalService) { }

  ngOnInit() { }

  abrirNoticia() {
    const browser = this.iab.create(this.article.url, '_system');
  }

  async lanzarActionSheetNoticia() {

    let guardarOBorrarFavoritosBoton;

    if (this.enFavoritos) {
      guardarOBorrarFavoritosBoton = {
        text: 'Delete Favourite',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalSrv.borrarFavoritos(this.article);
        }
      };
    } else {
      guardarOBorrarFavoritosBoton = {
        text: 'Favourite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalSrv.guardarFavoritos(this.article);
        }
      };
    }


    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Share',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.socialSharing.share(
              this.article.title,
              this.article.source.name,
              null,
              this.article.url
            );
          }
        },
        guardarOBorrarFavoritosBoton,
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark'
        }]
    });
    await actionSheet.present();
  }

}
