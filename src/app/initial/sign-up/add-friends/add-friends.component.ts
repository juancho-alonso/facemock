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
  deletedRequest:boolean;

  constructor(private userList:UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.arrayF()
  }

  usersArray = new UsersService
  requestsArray = []
  othersArray = []

  arrayF() {
    // Loop over users array pushing them to corresponding arrays depending if they sent a request or not
    for(let i = 0; i < this.userList.users.length ; i++){
      if(!this.userList.users[i].request){
        this.requestsArray.push(this.userList.users[i])
      } else {
        this.othersArray.push(this.userList.users[i])
      }
    }
  }

  nextPage(){
    // Moves onto next page
    this.next = true;
  }

  navHome() {
    // Navigates to wall
    this.router.navigate(["/wall"])
  }

  navProfile() {
    // Navigates to profile
    this.router.navigate(["/profile"])
  }
  
  onSkip(){
    // Navigates to wall
    this.router.navigate(["/wall"])
  }

  confirmFriend(friend, resolution, index){
    // Takes three arguments
    // 1 - Name and surname of the friend
    // 2 - Screen resolution
    // 3 - Index number 
    var addedFriend = `${friend.firstname} ${friend.surname}`;
    // Avoids duplicating friends
    if(!this.arrFriends.includes(addedFriend)){
      this.arrFriends.push(addedFriend)
      friend.isFriend = true;
    }
    // Add a friend to the arrFriends array, stored in the currentUser friends array
    this.currentUser.friends = this.arrFriends
    var userFriends = this.currentUser
    // Overwrites 'curUser', adding the friend to its friends array
    localStorage.setItem("curUser", JSON.stringify(userFriends))
    // Hides the corresponding friend request element, on mobile resolution 
    if(resolution === 'mbl'){
      document.getElementById('data'+ index).style.display = "none";
    }
  }

  deleteRequest(index) {
    // Deletes friend requests
    document.getElementById('data'+ index).style.display = "none";
  }

  removeRequest(index) {
    // Deletes friend suggestion
    document.getElementById('req'+ index).style.display = "none"
  }

  addFriendsMbl() {
    // Add friend on mobile version
    var checkList = document.querySelectorAll<HTMLInputElement>('.inputs')
    var checkboxArr = Array.from(checkList)
    // Loops over the checkboxes. If checked, the selected friend is pushed to arrFriends
    for (let i = 0; i < checkboxArr.length; i++) {
     if(checkboxArr[i].checked == true){
       this.arrFriends.push(checkboxArr[i].parentNode.parentNode.firstChild.childNodes[0].nodeValue)
     }
    }
    this.currentUser.friends = this.arrFriends
    var newUserFriends = this.currentUser
    // Overwrites 'curUser', including the added friends to its friends array
    localStorage.setItem("curUser", JSON.stringify(newUserFriends))
    // Navigates to wall
    this.router.navigate(["/wall"])
  }
}
