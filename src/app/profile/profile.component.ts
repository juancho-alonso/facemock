import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UsersService]
})
export class ProfileComponent implements OnInit {

  name:any;
  userComment:any;
  userRouteName:any;
  profileUrl:any;
  curProfile:any;
  currentUser = JSON.parse(localStorage.getItem('curUser')); 


  constructor(private route: ActivatedRoute,
              public usersList:UsersService) { }

  ngOnInit(): void {
    console.log(this.currentUser)
    console.log(this.usersList.users[0])
    this.name = this.route.snapshot.params['name'];
    var url = window.location.href;
    var changedUrl = url.substring(url.lastIndexOf('/') + 1)
    var urlSplit = changedUrl.split(".")
    urlSplit.splice(1, 0, ' ')
    this.profileUrl = urlSplit.join('')
    console.log(this.profileUrl)
    if (this.profileUrl == this.currentUser.firstname + " " + this.currentUser.surname) {
      this.curProfile = this.currentUser;
    } else {
      for (let i = 0; i < this.usersList.users.length; i++) {
       if (this.usersList.users[i].firstname + " " + this.usersList.users[i].surname == this.profileUrl) {
        this.curProfile = this.usersList.users[i];
       }    
      }
    }
  }

  onComment(message){
    this.userComment = message;
  }
}
