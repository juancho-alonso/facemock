import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Input() newRegister = false;
  @ViewChild('formSignUp') signupForm: NgForm;
  days = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
  years = [];
  pronouns = [{
                subject: 'She',
                object: 'her'
              },
              {
                subject: 'He',
                object: 'him'
              },
              {
                subject: 'They',
                object: 'them'
              }  
  ]

  genders = ['Female', 'Male', 'Custom']
  
  defaultDay = "day";
  defaultMonth = "month";
  defaultYear = "year";
  defaultPronoun = "pronoun";
  
  

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i < 32; i++){
      this.days.push(i);
    };

    for (let j = 2020; j > 1900; j--){
      this.years.push(j);
    }
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

  onValidateForm(){
      var inputs = document.querySelectorAll<HTMLInputElement>(".signup-input");
        for (let i = 0; i < inputs.length; i++) { 
          console.log(inputs);   
          console.log(this.signupForm.form.controls.month.value)  
            if (inputs[i].classList.contains('ng-invalid') || this.signupForm.form.controls.gender.status == "INVALID" ||
                this.signupForm.form.controls.day.value == "day" ||
                this.signupForm.form.controls.month.value == "month" ||
                this.signupForm.form.controls.year.value == "year"){
                  console.log(this.signupForm.form.controls.day.value)  
                inputs[i].style.border = "1px solid red";
            } else if (inputs[i].classList.contains('ng-valid') 
            // || this.signupForm.form.controls.gender.status == "VALID" 
            // ||
            //     this.signupForm.form.controls.day.value != "day" ||
            //     this.signupForm.form.controls.month.value != "month" ||
            //     this.signupForm.form.controls.year.value != "year"
            
                )
                {console.log("else if")
                inputs[i].style.border = "none";
            } 
          }
  }

  

}
