import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DesignerService } from '../../services/designerService';
import { AddReviewPage } from '../add-review/add-review';
import { CommentChatPage } from '../comment-chat/comment-chat';

declare var $: any;

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {

  designer: any;
  albums: any; 
  reviews: any;
  segment: any = 'photos';
  
  loadingReviews = false;

  constructor(public navCtrl: NavController, 
    public designerService: DesignerService,
    public navParams: NavParams) {

      let from = this.navParams.get('from')
      if (from == 'add-review') {
        this.segment = 'reviews'
        this.scrollToBottom();
      }
    
      this.designer = this.designerService.currentDesigner;
      // this.albums = this.designerService.albums;
      // this.reviews = this.designerService.reviews;
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad PortfolioPage');
      this.initAlbumsReviews();
  }

  async initAlbumsReviews() {
    this.albums = await this.designerService.getDesignerAlbums(this.designer.id);
    this.reviews = await this.designerService.getDesignerReviews(this.designer.id);
  }

  async segmentChanged(e) {
    console.log(e);
    
  }

  goBack() {
    this.navCtrl.pop()
  }

  goAddReview() {
    this.navCtrl.push(AddReviewPage, {designer: this.designer})
  }

  goToCommentChat(review) {
    this.navCtrl.push(CommentChatPage, {review: review})
  }

  scrollToBottom() {
    // let reviewsBody = $(`.reviews`);
    // try {
    //   var scrollLength = reviewsBody[0].scrollHeight - reviewsBody[0].clientHeight
    //   reviewsBody.animate({ scrollTop: scrollLength }, 300);
    // } catch (err) {
    //   console.error(err);
    // }
  }
}
