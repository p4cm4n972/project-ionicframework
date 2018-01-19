import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AddtablePage } from '../addtable/addtable';

/**
 * Generated class for the TablesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tables',
  templateUrl: 'tables.html',
})
export class TablesPage {

   tables: any;
   errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablesPage');
    this.getTable();
  }
getTable() {
   this.rest.getTable()
   .subscribe(tables => {
     this.tables = tables;
   })
  
}
addTable() {
  let modal = this.modalCtrl.create(AddtablePage);

  modal.onDidDismiss( table => {
    if(table) {
      this.tables.push(table);
      this.rest.createTable(table);
    }
  });
  modal.present();
}

deleteTable(table) {

  let index = this.tables.indexOf(table);

  if(index > -1) {
    this.tables.splice(index, 1);
  }; 
  this.rest.deleteTable(table._id)
}

}
