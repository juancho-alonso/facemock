import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.scss'],
  providers: [LoginService]
})
export class LoginFailedComponent implements OnInit {

  @ViewChild('retryPass') retryPass;
  
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
   var local = localStorage;
   var localPass = local.password;
   console.log(this.currentUser) 
  }

  currentUser = JSON.parse(localStorage.getItem('curUser'))


}
