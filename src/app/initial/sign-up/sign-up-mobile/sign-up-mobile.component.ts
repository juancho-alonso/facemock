import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-up-mobile',
  templateUrl: './sign-up-mobile.component.html',
  styleUrls: ['./sign-up-mobile.component.scss']
})
export class SignUpMobileComponent implements OnInit {

  @ViewChild('formNames') formNames: NgForm;
  @ViewChild('formDate') formDate: NgForm;
  @ViewChild('customInput') customInput;


  namesOk = 1;
  days = [];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
  }]

genders = ['Female', 'Male']

  defaultDay = "day";
  defaultMonth = "month";
  defaultYear = "year";
  defaultPronoun = "pronoun"; 

customGender = true;
displayGender = false;


  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i < 32; i++){
      this.days.push(i);
    };

    for (let j = 2020; j > 1900; j--){
      this.years.push(j);
    }
    console.log(this.customInput)

  }

  onNextReg(){
      var nameInputs = document.querySelectorAll<HTMLInputElement>(".input-names");
      var namesArr = Array.from(nameInputs)
      var dateInputs = document.querySelectorAll<HTMLSelectElement>(".date-input")
      var dateArr = Array.from(dateInputs);
      var genderInputs = document.querySelectorAll<HTMLElement>(".gender-input");
      var genderArr = Array.from(genderInputs);
      console.log(genderArr[2]);

      for (const cur of namesArr) {
        cur.style.borderColor = "1px solid lightgray";
        if (cur.className.includes('ng-invalid') && !this.formNames.valid){
          cur.style.border = "1px solid red"
          this.namesOk = 1;
      } else if (cur.className.includes('ng-valid') && this.formNames.valid){
          cur.style.borderColor = "1px solid lightgray";
          this.namesOk = 2;
      } 
      }
      
      for (const cur of dateArr){
        cur.style.borderColor = "1px solid lightgray";
        if (cur.value != "day" && cur.value != "month" && cur.value != "year"){
          console.log(cur.value + ' IF')
          cur.style.border = "1px solid lightgray"
          this.namesOk = 3;
      } else if (cur.value === "day" || "month" || "year"){
            console.log(cur.value + ' IF ELSE')
          cur.style.border = "1px solid red";
          this.namesOk = 2;
      } 
      }
      
  }

  onCustomChange() {
    this.customGender = !this.customGender;
    this.displayGender = !this.displayGender;
    
  }

  onGenderChange() {
    console.log(this.customInput)
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
}
