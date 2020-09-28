import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  // Get the input element
  @ViewChild('inputPost') inputPost;
  // Access local storage for current User
  currentUser = JSON.parse(localStorage.getItem('curUser')); 
  // Expose the posts Array
  @Output() comment = new EventEmitter<any>();
  // Store the posts Array
  userInput = [];
  // Keep count of the current post id
  idCount:number = 0;
  

  constructor() { }

  ngOnInit(): void {

  }

  

  onComment(event){ 
    if(event.key === "Enter") {
    // Create a post model
    var model = { 
      id:0,
      post:'',
      comments:[]
    };

    // Increment id Counter  
    this.idCount++

    // Assign input value to the current post
    model.post = this.inputPost.nativeElement.value;

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
