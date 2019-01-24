import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import {User} from './user';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User;  
  loading;
  constructor(private router: Router, private auth: AuthService, private loadingCtrl: LoadingController, private alertController: AlertController) { 
    this.user = new User();
    this.user.email='';
    this.user.password='';
    this.user.errorMessage = '';
  }
  public createAccount() {
    this.router.navigate(['/signup'])
  }
  public login() {
    
    this.auth.login(this.user)
    .subscribe(allowed => {
        if (allowed) {
          this.router.navigate(['/home'])
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }
  showLoading( ) {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 5000
    });

    this.loading.present();      
  }
  async showError(text) {
    if(this.loading !== undefined) {
      this.loading.dismiss(); 
    }
    this.user.errorMessage = 'Oops, wrong email or password.';
    // const alert = await this.alertController.create({
    //   header: 'Fail',
    //   subHeader: 'Login failed',
    //   message: 'Invalid email/password',
    //   buttons: ['OK']
    // });

    // await alert.present();
  }

  ngOnInit() {
    this.user.email='';
    this.user.password='';
  }

}

