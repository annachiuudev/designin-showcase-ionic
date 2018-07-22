import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackendService } from '../../services/backendService';
import { PortfolioPage } from '../portfolio/portfolio';
import { DesignerService } from '../../services/designerService';
import { MockBackendService } from '../../services/mockbackendService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  designers: any = [];

  constructor(public navCtrl: NavController,
    public designerService: DesignerService,
  public backendService: BackendService) {

    this.initDesigners();

  }



  async initDesigners() {
    this.designers = await this.backendService.getCall("users");
    this.designers.map((des, i) => {
      des.imgUrl = `./assets/imgs/designer-${i+1}.jpg`
    })
    
  }


  async select(designer) {
    console.log('selected', designer.name);
    await this.designerService.setCurrentDesigner(designer);
    this.navCtrl.push(PortfolioPage);
  }

}
