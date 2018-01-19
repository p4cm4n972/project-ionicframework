import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TablesPage');
    this.login();
  }

  login() {
    let modal = this.modalCtrl.create(LoginPage,{},{enableBackdropDismiss: false });
    modal.present();
  }
}
