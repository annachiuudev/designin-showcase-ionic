import { Input, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { MockBackendService } from '../../services/mockbackendService';
import { DesignerService } from '../../services/designerService';
import { Subscription } from '../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'reviews',
  templateUrl: 'reviews.html'
})
export class ReviewsComponent {

  @Input('reviews') reviews;
  @Output() onCommentClick = new EventEmitter();
  
  reviewSubscription: Subscription;

  constructor(public backendService: MockBackendService,
  public designerService: DesignerService) {
    
  }

  ionViewDidLoad() {
  
  }

  goToComment(review) {
    console.log('review', review)
    this.onCommentClick.emit(review);
  }

  scrollToBottom() {
    console.log('SCROLL')
    let chatbody = $(`.chat-window`);
    try {
      var scrollLength = chatbody[0].scrollHeight - chatbody[0].clientHeight
      chatbody.animate({ scrollTop: scrollLength }, 300);
    } catch (err) {
      console.error(err);
    }
  }


}
