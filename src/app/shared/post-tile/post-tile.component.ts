import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss']
})
export class PostTileComponent implements OnInit, OnChanges {

  @Input('userComment') userComment: any;
  @Input('post') post: any;
  currentUser = JSON.parse(localStorage.getItem('curUser')); 


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.userComment + " Recibio data")
    
  }

  // newPost() {
    
  // }

}
