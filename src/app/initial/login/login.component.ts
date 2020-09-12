import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  mobile: boolean;
  newRegister = false;
  @ViewChild('formSignUp') signupForm: NgForm;

  constructor(private router: Router,
              private bpo: BreakpointObserver) { }

  ngOnInit() {
    if (this.bpo.isMatched('(max-width: 768px)')) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  public onNewRegister(){
    if (this.mobile) {
    this.router.navigate(['/sign-up-mobile'])
    } else if (!this.mobile){
      this.newRegister = !this.newRegister
      this.router.navigate(['/'])
    }
  };


  // public onSubmit(form: NgForm){
  //   console.log(form);
  // }
}
