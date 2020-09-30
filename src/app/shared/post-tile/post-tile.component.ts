import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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

  parsedUrl:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.userComment + " Recibio data")
  }

  newComment(event) {
    if(event.key === "Enter" && this.postComment.nativeElement.value !== ''){
      var comment = {
        message:'',
        publisher:''
      }

      for (let i = 0; i < this.userComment.length; i++) {
        if(event.target.dataset.n == this.userComment[i].id){
          comment.message = this.postComment.nativeElement.value;
          comment.publisher = this.currentUser.firstname + ' ' + this.currentUser.surname;
          this.userComment[i].comments.push(comment);
        }      
      }
    }

  }

  parseURL(url){
    var urlSplit = url.split(" ")
    urlSplit.splice(1, 0, '.')
    this.parsedUrl = urlSplit.join('')
    this.router.navigate([`profile/${this.parsedUrl}`])
  }

}
