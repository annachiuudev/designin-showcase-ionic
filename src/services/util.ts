
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '../../node_modules/ionic-angular';
import moment from 'moment';

@Injectable()
export class UtilServices {

    loader;


    constructor(public alert: AlertController,
    public loadingCtrl: LoadingController) {
    }


    showAlert(title, message) {
        let alert = this.alert.create({
            title: title,
            message: message,
            buttons: ['OK']
        });
        alert.present();
    }

    somethingWentWrong() {
        this.showAlert('Something went wrong', 'We are unable to process your request at this moment.')
    }


    timestampFormatted(time, format) {
        return moment(time).format(format);
      }
  

    presentLoadingWheel() {
        this.loader = this.loadingCtrl.create();
        this.loader.present();
    }

    dismissLoader() {
        this.loader.dismiss();
    }
}
