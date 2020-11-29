import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsersService]
})
export class LoginComponent implements OnInit {
  
  mobile: boolean;
  newRegister = false;
  wrongPass = false;
  unexistingUser = false;
  // Access the form
  @ViewChild('formSignUp') signupForm: NgForm;
  // Access the email input
  @ViewChild('email') email;
  // Access the password input
  @ViewChild('pass') pass;
  

  constructor(private router: Router,
              private bpo: BreakpointObserver,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // Sets the mobile property depending on the resolution
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
      this.newRegister = !this.newRegister;
      this.router.navigate(['/'])
    }
  };

  onLogin(){
    // Checks if the username corresponds to its password, based on the user's email address
    var curEmail = this.email.nativeElement.value;
    var curPass = this.pass.nativeElement.value;
    var curUser = JSON.parse(localStorage.getItem(curEmail))

    if (this.mobile && curEmail === '' || this.mobile && curEmail !== curUser){
      // Non existing user
      this.unexistingUser = true;
      this.email.nativeElement.style.border = "1px red solid";
    } else if (!this.mobile && curEmail === '' || !this.mobile && curEmail !== curUser) {
      this.router.navigate(['/user-not-found']);
    }

    var localPass = curUser.password

    if(curUser != null){
      // Existing user
      if(curPass == localPass) {
        // Navigate to 'wall'
        this.router.navigate(['/wall'])
      } else if(curPass !== localPass){
        // Wrong password
        if(this.mobile){
          this.wrongPass = true
          this.unexistingUser = false;
          this.pass.nativeElement.style.border = "1px red solid"
          this.email.nativeElement.style.border = "1px #ededed solid"
        } else if(!this.mobile){
          this.router.navigate(['/login-failed'])
        }
      } 
    } 
  }

}
