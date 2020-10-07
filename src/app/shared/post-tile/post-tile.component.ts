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
  like = false;
  likeElement = document.querySelector("#like-box");
  likeIcon = document.querySelector("#like-icon");
  insertComment = false;

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

  onLike(e){
    this.like = !this.like;
    console.log(this.likeElement.classList)
    if(!this.likeElement.classList.contains('filled-like')){
      console.log(123)
    //   setTimeout(() => {this.likeIcon.classList.add('animated-like')
    // }, 1500);

    }
    setTimeout(() => {this.likeElement.classList.add('animated-like')
    }, 100);
    //this.likeIcon.classList.add('animated-like');
    console.log(this.likeIcon.classList)
  }

  onCommentToggle(){
    this.insertComment = !this.insertComment;
  }
}
