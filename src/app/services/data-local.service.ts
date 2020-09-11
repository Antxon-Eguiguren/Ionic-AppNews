import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  favNews: Article[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  guardarFavoritos(noticia: Article) {
    const existe = this.favNews.find(item => {
      return item.title === noticia.title;
    });

    if (!existe) {
      this.favNews.unshift(noticia);
      this.storage.set('favoritos', this.favNews);
    }

    this.presentToast('Saved in favourites!');
  }

  borrarFavoritos(noticia: Article) {
    this.favNews = this.favNews.filter(item => {
      return item.title !== noticia.title;
    });
    this.storage.set('favoritos', this.favNews);
    this.presentToast('Deleted from favourites!');
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.favNews = favoritos;
    }
  }
}
