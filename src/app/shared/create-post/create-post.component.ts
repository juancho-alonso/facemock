import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @ViewChild('inputPost') inputPost;
  currentUser = JSON.parse(localStorage.getItem('curUser')); 
  @Output() comment = new EventEmitter<any>();
  userInput = [];
  input;

  constructor() { }

  ngOnInit(): void {
  }

  onComment(message){
    // Saves the input content
    // this.comment = ;
    this.input = this.inputPost.nativeElement.value
    this.userInput.push(this.input)

    console.log(this.comment)

    this.comment.emit(this.userInput)
  }
}
