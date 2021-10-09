import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private _platform: Platform,
    private _router: Router
  ) {
    this._platform.ready()
    .then(() => {
      console.log('Platform.ready success');
      this.onBackPressed();      
    })
    .catch((error) => {
      console.log('Error while platform.ready', error);
    });
  }

  onBackPressed() {
    this._platform.backButton.subscribeWithPriority(0, () => {
      if(this._router.isActive('/home', true) || this._router.url === '/home') {
        navigator['app'].exitApp();
      }
    })
  }
}