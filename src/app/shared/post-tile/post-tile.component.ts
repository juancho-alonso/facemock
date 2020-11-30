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

  // Creates new comment 
  newComment(event) {
    if(event.key === "Enter" && this.postComment.nativeElement.value !== ''){
      var comment = {
        message:'',
        publisher:'',
        avatar: ''
      }
      // Loops through the comments array
      for (let i = 0; i < this.userComment.length; i++) {
        // Inserts comment on post if both ids are the same 
        if(event.target.dataset.n == this.userComment[i].id){
          // New comment instance 
          comment.message = this.postComment.nativeElement.value;
          comment.publisher = this.currentUser.firstname + ' ' + this.currentUser.surname;
          this.userComment[i].comments.push(comment);
          // Assigns avatars to comments
          for (let h = 0; h < this.userComment[i].comments.length; h++) {
            this.commentAvatar = this.userCtx.createProfilePic(this.userComment[i].comments[h].publisher);
            this.userComment[i].comments[h].avatar = this.commentAvatar;
        }
        }      
      }
    }

  }

  // Parse URL for navigation
  parseURL(url){
    var urlSplit = url.split(" ")
    urlSplit.splice(1, 0, '.')
    this.parsedUrl = urlSplit.join('')
    this.router.navigate([`profile/${this.parsedUrl}`])
  }

  // Toggle like button
  onLike(e){
    this.like = !this.like;
    setTimeout(() => {this.likeElement.classList.add('animated-like')
    }, 100);
  }

  // Toggle comments
  onCommentToggle(){
    this.insertComment = !this.insertComment;
  }


}
