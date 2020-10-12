import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserContextService } from '../shared/user-context.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  providers: [UsersService, UserContextService]
})
export class WallComponent implements OnInit {

  userComment:any;
  currentUser = JSON.parse(localStorage.getItem('curUser'));
  curFriends = this.currentUser.friends 
  profilePic = [];
  currentFriend: any;
  

  constructor(public usersList: UsersService,
              public userCtx: UserContextService) { }

  ngOnInit(): void {
    //Go through current frineds array
    for (let i = 0; i < this.curFriends.length; i++) {
      //Passes array's elements one by one to the service
      this.currentFriend = this.userCtx.createProfilePic(this.curFriends[i]);
      this.profilePic.push(this.currentFriend)
    }
  }

  onComment(message){
    this.userComment = message;
  }
}
