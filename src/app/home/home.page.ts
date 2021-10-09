import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PluginCallService } from '../services/plugin-call.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgSrc = '';
  base64 = '';
  // imgSrc = 'https://placedog.net/500';
  
  constructor(
    private _pluginCallSvc: PluginCallService,
    private _loadingController: LoadingController
  ) {}

  // On Take Photo
  onTakePhoto(sourceType) {
    
    this._pluginCallSvc.onTakePicture(sourceType).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64 = imageData;
      this.imgSrc = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
      this._pluginCallSvc.showToast(err.toString());
     });
  }

  // On Set Wallpaper
  async onSetWallPaper(type) {
    const loading = await this._loadingController.create({
      message: 'Setting Wallpaper...'
    });
    
    await loading.present();
    
    setTimeout(async () => {
      this._pluginCallSvc.onSetWallPaper(this.base64, type);
      await loading.dismiss();
      
      this.onClearBase64AndImageSrc();
      
    }, 1500);
    
  }

  // On Change Photo. Clearing of image source and base64 generated.
  onClearBase64AndImageSrc() {
    this.imgSrc = '';
    this.base64 = '';
  }

}
