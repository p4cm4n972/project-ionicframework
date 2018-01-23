import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AdminLoginPage } from '../admin-login/admin-login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
title: any;
password: any;
regData: { title: '', passssword: ''};
private register: FormGroup;

  constructor(public authService: AuthServiceProvider, public rest: RestProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public viewController: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.register = this.formBuilder.group({
      title: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  back() {
    this.viewController.dismiss(RegisterPage);
    let log = this.modalCtrl.create(AdminLoginPage,{},{enableBackdropDismiss: false });
    log.present();
  }

  doSignup(register) {
    console.log(register);
    this.authService.register(register),() => {
      
      //this.navCtrl.pop();
    };
    
    };
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
