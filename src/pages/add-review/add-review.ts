import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MockBackendService } from '../../services/mockbackendService';
import { DesignerService } from '../../services/designerService';
import { UtilServices } from '../../services/util';
import { PortfolioPage } from '../portfolio/portfolio';


@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {

  designer: any = 'your designer'
  services = {
    service1: false,
    service2: false,
    service3: false,
    service4: false,
  }

  review: any = '';

  constructor(public navCtrl: NavController, 
    public designerService: DesignerService,
    public util: UtilServices,
    public navParams: NavParams) {
    this.designer = this.navParams.get('designer');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReviewPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  onSubmit() {
    if (this.review != ''){

      this.util.presentLoadingWheel();
      this.designerService.addReview(this.services, this.review).then(res => {
        this.util.dismissLoader();
        this.navCtrl.pop();
      }).catch(err => {
        this.util.dismissLoader();
        this.util.somethingWentWrong();
      })
    } else {
      this.util.showAlert('Oops', `Please share your experience with us!`);
    }
  }

}
