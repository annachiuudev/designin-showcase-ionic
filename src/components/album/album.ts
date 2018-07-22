import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'album',
  templateUrl: 'album.html'
})
export class AlbumComponent {

  @Input('albums') albums;

  constructor() {
  }
  
  ngOnInit() {
    console.log(this.albums);
  }

}
