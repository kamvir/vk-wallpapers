import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PluginCallService {
  options: CameraOptions = {
    quality: 100,
    destinationType: this._camera.DestinationType.DATA_URL,
    encodingType: this._camera.EncodingType.JPEG,
    mediaType: this._camera.MediaType.PICTURE
  }
  constructor(
    private _camera: Camera,
    private _toastCtrl: ToastController,
    private _alertCtrl: AlertController
  ) { }

  // Taking picture (from Gallery/ Camera)
  onTakePicture(sourceType) {
    this.options.sourceType = sourceType; // Decides from where to take picture.

    return this._camera.getPicture(this.options);
  }

  // On set wallpaper using base64
  onSetWallPaper(base64, type) {
    try {
      window['plugins'].wallpaper.setImageBase64(base64, type);
      this.showToast('Wallpaper set successfully!');
    } catch(e) {
      this.showAlert('Unable to set wallpaper \n' + e.toString());
    }
  }

  async showToast(msg) {
    const toast = await this._toastCtrl.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

  async showAlert(msg) {
    const alert = await this._alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
