import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.scss'],
  providers: [UsersService]
})
export class AddFriendsComponent implements OnInit {

  next = false;
  currentUser = JSON.parse(localStorage.getItem('curUser'));
  arrFriends = [];

  constructor(private userList:UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.arrayF()
    console.log(this.userList.users)
  }

  usersArray = new UsersService
  requestsArray = []
  othersArray = []

  arrayF() {
    for(let i = 0; i < this.userList.users.length ; i++){
      if(!this.userList.users[i].request){
        this.requestsArray.push(this.userList.users[i])
      } else {
        this.othersArray.push(this.userList.users[i])
      }
    }
  }

  nextPage(){
    this.next = true;
  }

  navHome() {
    this.router.navigate(["/wall"])
  }

  navProfile() {
    this.router.navigate(["/profile"])
  }
  
  onSkip(){
    this.router.navigate(["/wall"])
  }

  addFriend(friend){
    var addedFriend = `${friend.firstname} ${friend.surname}`;
    console.log(addedFriend)
    console.log(this.currentUser)
    
    // Avoids duplicating friends
    if(!this.arrFriends.includes(addedFriend)){
      this.arrFriends.push(addedFriend)
    }
    
    console.log(this.arrFriends)

    this.currentUser.friends = this.arrFriends
    var userFriends = this.currentUser
    console.log(userFriends)
    localStorage.setItem("curUser", JSON.stringify(userFriends))
    
  }
}
