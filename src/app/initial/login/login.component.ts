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
  wrongPass = false;
  @ViewChild('formSignUp') signupForm: NgForm;
  @ViewChild('email') email;
  @ViewChild('pass') pass;



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

  onLogin(){
    var curEmail = this.email.nativeElement.value;
    var curPass = this.pass.nativeElement.value;
    var local = JSON.parse(localStorage.getItem(curEmail))
    var localPass = local.password

    if(local != null){
      // Existe el usuario
      if(curPass == localPass) {
        console.log('Login exitoso')
        // Navegar al componente 'wall'
        this.router.navigate(['/wall'])
      } else if(curPass !== localPass){
        // Contrasena incorrecta
        if(this.mobile){
          this.wrongPass = true
        } else if(!this.mobile){
          // this.router.navigate(['/ERROR'])
        }
        console.log('Login FALLIDO MAL AHI MONO')
        // Mostrar pagina o mensaje de error
      } 
    } else if (local == null){
      // No existe el mail (usuario inexistente)
    }


    console.log(local.password)
  }

  // public onSubmit(form: NgForm){
  //   console.log(form);
  // }
}
