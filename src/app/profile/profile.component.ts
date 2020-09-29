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
  currentUser = JSON.parse(localStorage.getItem('curUser')); 


  constructor(private route: ActivatedRoute,
              private userList:UsersService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    var url = window.location.href;
    var changedUrl = url.substring(url.lastIndexOf('/') + 1)
    var urlSplit = changedUrl.split(".")
    urlSplit.splice(1, 0, ' ')
    this.profileUrl = urlSplit.join('')
    console.log(this.profileUrl)
  }

  onComment(message){
    this.userComment = message;
    console.log(this.userComment + ' User Comment in Wall component')
  }
}
