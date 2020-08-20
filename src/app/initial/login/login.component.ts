import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  newRegister = false;
  @ViewChild('formSignUp') signupForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  public onNewRegister(){
    this.newRegister = !this.newRegister
  };


  public onSubmit(form: NgForm){
    console.log(form);
  }
}
