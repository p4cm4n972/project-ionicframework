import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TablesPage } from '../tables/tables';




/**
 * Generated class for the AdminLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {
  username: any;
  password: any;
  regData: { username: '', password: '' };
  loginData = { username: '', password: '' };

  private user: FormGroup;
  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public modalCtrl: ModalController, private formBuilder: FormBuilder, private authService: AuthServiceProvider) {
    this.user = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLoginPage');
  }
  register() {
    console.log('REGISTER');    
    this.navCtrl.pop();
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  login(user) {
    console.log('LOGIN');
    this.authService.login(this.user), (data) => {
    }
    console.log('end');
    //this.viewController.dismiss(AdminLoginPage);  
    this.navCtrl.pop();
    this.navCtrl.push(TablesPage);
  }
  return() {
    //this.viewController.dismiss(RegisterPage);
    this.navCtrl.pop();
    let log = this.modalCtrl.create(LoginPage, {}, { enableBackdropDismiss: false });
    log.present();
  }
  

}
