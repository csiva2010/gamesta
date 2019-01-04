import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = { email: '', password: '' };
  loading;
  constructor(private router: Router, private auth: AuthService, private loadingCtrl: LoadingController, private alertController: AlertController) { }
  public createAccount() {
    this.router.navigate(['/signup'])
  }
  public login() {
    
    this.auth.login(this.credentials)
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
    const alert = await this.alertController.create({
      header: 'Fail',
      subHeader: 'Login failed',
      message: 'Invalid email/password',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

}

