import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserContextService } from '../shared/user-context.service';
import { from } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';


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
  showCol:boolean;
  mobile:boolean;

  constructor(public usersList: UsersService,
              private bpo: BreakpointObserver,
              public userCtx: UserContextService) { }

  ngOnInit(): void {
   this.assignPics();
   if (this.bpo.isMatched('(max-width: 768px)')) {
    this.mobile = true;
  } else {
    this.mobile = false;
  }
  }

  assignPics(){
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

  showColumn(toggle){
    this.showCol = toggle;
    if(this.mobile == true && toggle == true) {
      document.getElementById('column-one').style.display = "flex"
      document.getElementById('column-one').style.width = "100%"
    } else if (this.mobile == true && toggle == false) {
      document.getElementById('column-one').style.display = "none"
    }
  }
}
