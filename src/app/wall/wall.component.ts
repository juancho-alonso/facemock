import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  providers: [UsersService]
})
export class WallComponent implements OnInit {

  userComment:any;
  currentUser = JSON.parse(localStorage.getItem('curUser'));
  curFriends = this.currentUser.friends 
  

  constructor(public usersList: UsersService) { }

  ngOnInit(): void {
    console.log(this.curFriends)
  }

  onComment(message){
    this.userComment = message;
  }
}
