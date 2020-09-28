import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.scss']
})
export class LoginFailedComponent implements OnInit {

  @ViewChild('retryPass') retryPass;
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  currentUser = JSON.parse(localStorage.getItem('curUser'));

  onLogin(){
    if(this.retryPass.nativeElement.value == this.currentUser.password){
      this.router.navigate(['/wall']);
    }
  }

}
