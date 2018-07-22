import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BackendService } from '../services/backendService';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { DesignerService } from '../services/designerService';
import { ComponentsModule } from '../components/components.module';
import { MockBackendService } from '../services/mockbackendService';
import { AddReviewPage } from '../pages/add-review/add-review';
import { CommentChatPage } from '../pages/comment-chat/comment-chat';
import { UtilServices } from '../services/util';
import { LoginPage } from '../pages/login/login';
import { CurrentUserService } from '../services/currentUserService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PortfolioPage,
    AddReviewPage,
    CommentChatPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ComponentsModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PortfolioPage,
    AddReviewPage,
    CommentChatPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackendService,
    MockBackendService, //For imitating some unavailable API endpoints
    DesignerService,
    UtilServices,
    CurrentUserService
    
  ]
})
export class AppModule {}
