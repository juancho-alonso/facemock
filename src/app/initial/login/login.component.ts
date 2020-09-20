import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  
  mobile: boolean;
  newRegister = false;
  wrongPass = false;
  unexistingUser = false;
  @ViewChild('formSignUp') signupForm: NgForm;
  @ViewChild('email') email;
  @ViewChild('pass') pass;
  

  constructor(private router: Router,
              private bpo: BreakpointObserver,
              private route: ActivatedRoute,
              private loginService:LoginService) { }

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
      this.newRegister = !this.newRegister;
      this.router.navigate(['/'])
    }
  };

  onLogin(){
    var curEmail = this.email.nativeElement.value;
    var curPass = this.pass.nativeElement.value;
    var curUser = JSON.parse(localStorage.getItem(curEmail))
    localStorage.setItem("curUser", JSON.stringify(curUser))

    if (this.mobile && curEmail === '' || this.mobile && curEmail !== curUser){
      this.unexistingUser = true;
      this.email.nativeElement.style.border = "1px red solid";
    } else if (!this.mobile && curEmail === '' || !this.mobile && curEmail !== curUser) {
      this.router.navigate(['/user-not-found']);
    }

    
    
    var localPass = curUser.password
    this.loginService.user.firstname = curUser.firstname
    console.log(this.loginService.user.firstname)



    if(curUser != null){
      // Existe el usuario
      if(curPass == localPass) {
        console.log('Login exitoso')
        // Navegar al componente 'wall'
        this.router.navigate(['/wall'])
      } else if(curPass !== localPass){
        // Contrasena incorrecta
        if(this.mobile){
          this.wrongPass = true
          this.unexistingUser = false;
          this.pass.nativeElement.style.border = "1px red solid"
          this.email.nativeElement.style.border = "1px #ededed solid"
        } else if(!this.mobile){
          this.router.navigate(['/login-failed'])
          // this.router.navigate(['/ERROR'])
        }
        console.log('Login FALLIDO MAL AHI MONO')
        // Mostrar pagina o mensaje de error
      } 
    } 

    console.log(curUser + "USUARIO ACTUAL")
  }

  // public onSubmit(form: NgForm){
  //   console.log(form);
  // }
}
