import { NgModule } from '@angular/core';
import { AlbumComponent } from './album/album';
import { ReviewsComponent } from './reviews/reviews';
import { CommonModule } from '../../node_modules/@angular/common';
import { IonicModule } from '../../node_modules/ionic-angular';
import { MyApp } from '../app/app.component';
@NgModule({
	declarations: [AlbumComponent,
    ReviewsComponent],
	imports: [CommonModule,
		IonicModule
	],
	exports: [AlbumComponent,
    ReviewsComponent]
})
export class ComponentsModule {}
