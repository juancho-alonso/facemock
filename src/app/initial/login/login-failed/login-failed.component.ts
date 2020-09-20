import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.scss'],
  providers: [LoginService]
})
export class LoginFailedComponent implements OnInit {

  @ViewChild('retryPass') retryPass;
  
  constructor(private loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  currentUser = JSON.parse(localStorage.getItem('curUser'));

  onLogin(){
    if(this.retryPass.nativeElement.value == this.currentUser.password){
      this.router.navigate(['/wall']);
    }
  }

}
