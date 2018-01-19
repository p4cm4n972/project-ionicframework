import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the AddtablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtable',
  templateUrl: 'addtable.html',
})
export class AddtablePage {

  title: any;
  description: any;
  rating: any;
  private table: FormGroup;
  postStatus: any;

  constructor(public rest: RestProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public viewController: ViewController, public navParams: NavParams) {
    this.table = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  save(table): void {
    this.rest.createTable(table)
    this.viewController.dismiss(table);
  }
  close(): void {
    this.viewController.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtablePage');
  }

}
