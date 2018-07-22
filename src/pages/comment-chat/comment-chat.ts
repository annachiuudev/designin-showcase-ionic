import { Component, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery'
import { DesignerService } from '../../services/designerService';
import { UtilServices } from '../../services/util';
import moment from 'moment';
import { CurrentUserService } from '../../services/currentUserService';

@Component({
  selector: 'page-comment-chat',
  templateUrl: 'comment-chat.html',
})
export class CommentChatPage {
  @ViewChildren('messages') messages: QueryList<any>;
  newComment: any;

  review: any;
  comments: any = [];
  constructor(public navCtrl: NavController,
    public currentUserService: CurrentUserService,
    public designerService: DesignerService,
    public util: UtilServices,
    public navParams: NavParams) {
    this.review = this.navParams.get('review')
    this.comments = this.review.comments;

  }

  ngAfterViewInit() {
    console.log("ngAFterViewINit")
    this.messages.changes.subscribe(res => {
      this.scrollToBottom();
    });
    this.scrollToBottom();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentChatPage');

  }

  goBack() {
    this.navCtrl.pop();
  }

  async onSendComment() {
    if (this.newComment != '') {
      let sentComment = await this.designerService.addComment(this.newComment, this.review.id);
      this.comments.push(sentComment);
      this.newComment = '';
    }
  }

  timestampFormatted(time) {
    if (moment(time).isSame(moment(), 'day')) {
      return this.util.timestampFormatted(time, 'LT')
    } else {
      return this.util.timestampFormatted(time, 'll')
    }
  }

  onEnter(e) {
    if (e.keyCode == 13) {
      this.onSendComment();
    }
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
