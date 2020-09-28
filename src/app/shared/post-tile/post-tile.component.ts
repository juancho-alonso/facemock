import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss']
})
export class PostTileComponent implements OnInit, OnChanges {

  @ViewChild('postComment') postComment: any;
  @Input('userComment') userComment: any;
  @Input('post') post: any;
  currentUser = JSON.parse(localStorage.getItem('curUser')); 


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.userComment + " Recibio data")
  }

  newComment() {
    console.log(this.postComment.nativeElement.dataname + " post comment")
    for (let i = 0; i < this.userComment.length; i++) {
        if(this.postComment.nativeElement.dataname == this.userComment[i].id){
          this.userComment[i].comments.push(this.postComment.nativeElement.value);
          console.log(this.userComment[i])
        }      
    }
  }
}
