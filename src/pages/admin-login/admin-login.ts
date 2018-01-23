import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  title: any;
  password: any;
  regData: { title: '', passssword: '' };
  loginData = { title: '', password: '' };

  private newUser: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public modalCtrl: ModalController, private formBuilder: FormBuilder, private authService: AuthServiceProvider) {
    this.newUser = this.formBuilder.group({
      title: ['', Validators.required],
      password: ['', Validators.required]
    })

  }
register() {
this.viewController.dismiss(AdminLoginPage);
let modal = this.modalCtrl.create(RegisterPage);
modal.present();
}

  login() {
    this.authService.login(this.loginData), () => {
      this.navCtrl.setRoot(TablesPage);

    }
  }
  return() {
    this.viewController.dismiss(RegisterPage);
    let log = this.modalCtrl.create(LoginPage, {}, { enableBackdropDismiss: false });
    log.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminLoginPage');
  }

}
