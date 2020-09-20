import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-user',
  templateUrl: './no-user.component.html',
  styleUrls: ['./no-user.component.scss']
})
export class NoUserComponent implements OnInit {

  @ViewChild('retryPass') retryPass;
  @ViewChild('retryEmail') retryEmail;


  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.currentUser)
  }

  currentUser = JSON.parse(localStorage.getItem('curUser'));

  onLogin(){
    var curEmail = this.retryEmail.nativeElement.value;
    var curPass = this.retryPass.nativeElement.value;
    var curUser = JSON.parse(localStorage.getItem(curEmail));
    localStorage.setItem("curUser", JSON.stringify(curUser));

    if(curEmail == this.currentUser.email && curPass == this.currentUser.password){
      this.router.navigate(['/wall']);
    } else if (curEmail == this.currentUser.email && curPass !== this.currentUser.password) {
      this.router.navigate(['/login-failed']);
    }
  }
}
