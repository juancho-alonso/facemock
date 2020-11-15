import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserContextService } from '../user-context.service';
import { UsersService } from 'src/app/users.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeScript, SafeStyle, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.scss'],
  providers: [UserContextService, UsersService]
})
export class PostTileComponent implements OnInit {

  @ViewChild('postComment') postComment: any;
  @Input('userComment') userComment: any;
  @Input('post') post: any;
  @Input('j') j:any;
  currentUser = JSON.parse(localStorage.getItem('curUser'));
  like = false;
  likeElement = document.querySelector("#like-box");
  likeIcon = document.querySelector("#like-icon");
  insertComment = false;
  currentAvatar: any;
  commentAvatar:any;
  profilePic = [];
  commentPic = [];
  

  parsedUrl:any;

  constructor(private router: Router,
              private userCtx: UserContextService,
              private usersList: UsersService) { }

  ngOnInit(): void {
    this.assignPhotos()
  }

  assignPhotos() {
            //Go through current friends array
            for (let i = 0; i < this.userComment.length; i++) {
              //Passes array's elements one by one to the service
              this.currentAvatar = this.userCtx.createProfilePic(this.userComment[i].author);
    
              this.profilePic.push(this.currentAvatar)
              //crear nuevo array con id del post y pushear a commentPic
              //Luego en el for, pushear el resultado a ese array en particular
              for (let h = 0; h < this.userComment[i].comments.length; h++) {
            
                this.commentAvatar = this.userCtx.createProfilePic(this.userComment[i].comments[h].publisher);
                this.userComment[i].comments[h].avatar = this.commentAvatar;    
            }
  

            }
  }

  newComment(event) {
    if(event.key === "Enter" && this.postComment.nativeElement.value !== ''){
      var comment = {
        message:'',
        publisher:'',
        avatar: ''
      }

      for (let i = 0; i < this.userComment.length; i++) {
        if(event.target.dataset.n == this.userComment[i].id){
          // Chimi
          comment.message = this.postComment.nativeElement.value;
          comment.publisher = this.currentUser.firstname + ' ' + this.currentUser.surname;
          this.userComment[i].comments.push(comment);
          for (let h = 0; h < this.userComment[i].comments.length; h++) {
            
            this.commentAvatar = this.userCtx.createProfilePic(this.userComment[i].comments[h].publisher);
            this.userComment[i].comments[h].avatar = this.commentAvatar;
        }
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
    if(!this.likeElement.classList.contains('filled-like')){
    //   setTimeout(() => {this.likeIcon.classList.add('animated-like')
    // }, 1500);

    }
    setTimeout(() => {this.likeElement.classList.add('animated-like')
    }, 100);
    //this.likeIcon.classList.add('animated-like');
  }

  onCommentToggle(){
    this.insertComment = !this.insertComment;
  }

  createURL() {
    //Create your URL
    return "https://player.vimeo.com/video/67929145?title=0&byline=0&portrait=0"
    // return your URL
   }
}
