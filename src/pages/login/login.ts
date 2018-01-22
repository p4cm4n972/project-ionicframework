import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { RestProvider } from '../../providers/rest/rest';
import { RegisterPage } from '../register/register';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TablesPage } from '../tables/tables';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AdminLoginPage } from '../admin-login/admin-login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public tables;
  public user;
  postStatus: any;
  loginData = { title:'', password:''};
  loading: any;
  data: any;
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public rest: RestProvider, public viewController: ViewController, public authService: AuthServiceProvider, private formBuilder: FormBuilder) {
    this.tables;
    this.user = this.formBuilder.group({
      title: ['', Validators.required]
    })
    
  }

  ionViewDidLoad() {
    this.getTable();

  }
  getTable() {
    this.rest.getTable()
    .subscribe(tables => {
      this.tables = tables;
    })
   
 }
 openAdmin() {
   this.viewController.dismiss(LoginPage);
   let pop = this.modalCtrl.create(AdminLoginPage);
   pop.present();
 }
 doLogin() {
  this.authService.login(this.loginData), () => {
    this.navCtrl.setRoot(TablesPage);

  }
  
}

}
