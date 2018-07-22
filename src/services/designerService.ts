
import { Injectable } from '@angular/core';
import { BackendService } from './backendService';
import { MockBackendService } from './mockbackendService';
import { CurrentUserService } from './currentUserService';

import moment from 'moment';
import { Subject } from '../../node_modules/rxjs/Subject';

@Injectable()
export class DesignerService {


    currentDesigner: any;
    albums: any = [];
    reviews: any = [];
    
    constructor(public backendService: BackendService,
        public currentUserService: CurrentUserService,
        public mockBackendService: MockBackendService) {
    }

    async setCurrentDesigner(designer) {
        this.currentDesigner = designer;
    }

    async getDesignerAlbums(designerId) {
        try {
            let albums: any = await this.backendService.getCall('albums', { userId: designerId })
            albums.map(album => {
                this.getAlbumPhotos(album.id).then(res => {
                    album.photos = res;
                    album.keyPhotoThumb = album.photos[0].thumbnailUrl
                })
            })
            this.albums = albums;
            return albums;

        } catch (err) {
            console.log('error at getDesignerAlbums', JSON.stringify(err));
        }
    }


    //We will be pretending comments where postId = designerId are reviews for the designer
    async getDesignerReviews(designerId) {
        try {
            let reviews: any = await this.backendService.getCall('posts', { postId: designerId })
            //PRETEND random posts are reviews for the artist - random number 
            let randomNumber = Math.floor(Math.random() * 12) + 4;

            let newReviews = reviews.filter(review => {
                return review.id % randomNumber == 0 && review.userId != this.currentDesigner.id
            })

            // //mock number of likes, and grab user
            newReviews.map(async review => {
                review.likes = Math.floor(Math.random() * 88) + 0;
                review.user = await this.backendService.getCall(`users/${review.userId}`)
                review.userImgUrl = `./assets/imgs/user-${review.userId}.jpg`;
                review.comments = await this.getPostComments(review.id)
                review.commentsCount = review.comments.length
            })

            // order reviews by likes
            newReviews.sort(function (a, b) {
                return b.likes - a.likes
            })

            this.reviews = newReviews;
            return newReviews;

        } catch (err) {
            console.log('error at getDesignerReviews', JSON.stringify(err));
        }
    }

    async getAlbumPhotos(albumId) {
        try {
            let photos = await this.backendService.getCall('photos', { albumId: albumId })
            return photos
        } catch (err) {
            console.log('error', JSON.stringify(err));
        }
    }

    async getPostComments(reviewId) {
        let comments: any = await this.backendService.getCall('comments', { postId: reviewId });

        comments.map(comment => {
            let randomNumber = Math.floor(Math.random() * 60);
            let timestamp = moment().subtract(randomNumber, 'days').toJSON()
            comment.createDate = timestamp;
            comment.name = this.parseNameFromEmail(comment.email);
            comment.userImgUrl = './assets/imgs/user.jpg';

       })

       //sort according to time;
       comments.sort((a, b) => {
            return moment(a.createDate).valueOf() - moment(b.createDate).valueOf(); 
       })

       return comments;

    }

    addReview(services, review) {

        //get current user
        let user = this.currentUserService.user;

        return new Promise((resolve, reject) => {

            //Imitation call to post comment
            this.backendService.postCall('posts', {
                userId: user.id,
                user: user,
                userImgUrl: `./assets/imgs/user.jpg`,
                designerId: this.currentDesigner.id,
                services: services,
                body: review,
                likes: 0,
                commentsCount: 0,
                // comments: []
            }).then(newReview => {
                this.reviews.push(newReview);
                resolve('done');
            }).catch(err => {
                console.log(JSON.stringify(err));
                reject(err);
            })
        })
    }

    async addComment(newComment, postId) {
        let now = new Date()
        let user = this.currentUserService.user;
        
        let commentObj = {
            body: newComment, 
            email: user.email,
            postId: postId,
            userImgUrl: `./assets/imgs/user.jpg`,
            name: this.parseNameFromEmail(user.email),
            createDate: moment(now).toJSON()
        }

        return await this.backendService.postCall('comments', commentObj);
    }

    private parseNameFromEmail(email) {
        return email.split("@")[0]
    }
}
