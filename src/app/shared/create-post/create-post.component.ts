import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  providers:[UsersService]
})
export class CreatePostComponent implements OnInit {

  // Get the input element
  @ViewChild('inputPost') inputPost;
  // Access local storage for current User
  currentUser = JSON.parse(localStorage.getItem('curUser')); 
  // Expose the posts Array
  @Output() comment = new EventEmitter<any>();
  // Store the posts Array
  userInput = [
    { 
      id:1,
      post:'What a nice day!',
      author: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname,
      comments:[{
        message:'Amazing sunshine',
        publisher: this.usersList.users[1].firstname + ' ' + this.usersList.users[1].surname
      },{
        message:'I totally agree!',
        publisher: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname
      }]
    },
    { 
      id:2,
      post:'I am glad Trump lost',
      author: this.usersList.users[3].firstname + ' ' + this.usersList.users[3].surname,
      comments:[{
        message:'No kidding...',
        publisher: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname
      }]
    },
    { 
      id:3,
      post:'Hello everybody :)',
      author: this.usersList.users[4].firstname + ' ' + this.usersList.users[4].surname,
      comments:[{
        message:'Hi there!',
        publisher: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname
      }]
    }
  ];
  // Keep count of the current post id
  idCount:number = this.userInput.length - 1;
  

  constructor(private usersList: UsersService) { }

  ngOnInit(): void {
    // Emit posts Array
    this.comment.emit(this.userInput)
  }

  onComment(event){ 
    if(event.key === "Enter" && this.inputPost.nativeElement.value !== '') {
    // Create a post model
    var model = { 
      id:0,
      post:'',
      author:'',
      comments:[]
    };

    // Increment id Counter  
    this.idCount++

    // Assign input value to the current post
    model.post = this.inputPost.nativeElement.value;

    // Assign current user to posts
    model.author = this.currentUser.firstname + ' ' + this.currentUser.surname;
    console.log('This is the author ' + model.author)

    // Assign id to the current post
    model.id = this.idCount;

    // Push object to posts Array
    this.userInput.push(model)

    // Emit posts Array
    this.comment.emit(this.userInput)

    // Clean input value
    this.inputPost.nativeElement.value = ''
    }
  }
}
