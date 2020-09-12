import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up-mobile',
  templateUrl: './sign-up-mobile.component.html',
  styleUrls: ['./sign-up-mobile.component.scss']
})
export class SignUpMobileComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @ViewChild('customInput') customInput;
  signupForm: FormGroup;


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
 

customGender = true;
displayGender = false;
submitOk = false;
public screen:number = 0;


  constructor(private router: Router) {   }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'names': new FormGroup({
        'firstname': new FormControl(null, Validators.required),
        'surname': new FormControl(null, Validators.required),
      }),
      'date': new FormGroup({
        'day': new FormControl('day', Validators.required),
        'month': new FormControl('month', Validators.required),
        'year': new FormControl('year', Validators.required)
      }),
      'gender': new FormControl('Female', Validators.required),
      'pronoun': new FormControl('pronoun', Validators.required),
      'customGender': new FormControl(null),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    })

    for (let i = 1; i < 32; i++){
      this.days.push(i);
    };

    for (let j = 2020; j > 1900; j--){
      this.years.push(j);
    }
  }

  onNextReg(){
      var dateInputs = document.querySelectorAll<HTMLOptionElement>(".date-input")
      var dateArr = Array.from(dateInputs);
      var genderInputs = document.querySelectorAll<HTMLInputElement>(".radio-gender");
      var genderArr = Array.from(genderInputs);
      var emailInput = document.querySelector<HTMLInputElement>(".email-input");
      var passInput = document.querySelector<HTMLInputElement>(".pass-input");
      var sections = document.querySelectorAll<HTMLElement>(".section");
      var sectionsArr = Array.from(sections);
      var stringy = this.screen.toString()
      var curScreen = document.querySelector<HTMLElement>(`div[data-id="${stringy}"]`)
      var nameInputs = document.querySelectorAll<HTMLInputElement>(".input-names");
      var namesArr = Array.from(nameInputs)

      if(this.screen === 0 && this.signupForm.get('names').valid){
        this.goForward();
      } else if(this.screen === 0 
        && this.signupForm.get('names.firstname').invalid
        || this.signupForm.get('names.surname').invalid
        ){
          for (const cur of namesArr) {
            cur.style.border = "1px solid rgb(118, 118, 118)";
               if (cur.className.includes('ng-invalid')){
             cur.style.border = "1px solid red"
               } else if (cur.className.includes('ng-valid')){
             cur.style.border = "1px solid rgb(118, 118, 118)";
               } 
             }

        } else if (this.screen === 1 
          && this.signupForm.get('date.day').dirty
          && this.signupForm.get('date.month').dirty
          && this.signupForm.get('date.year').dirty){
            this.goForward()
          } else if ( this.screen === 1 &&
            this.signupForm.get('date.day').pristine
            || this.signupForm.get('date.month').pristine
            || this.signupForm.get('date.year').pristine){
                  for (const cur of dateArr) {
                  cur.style.border = "1px solid rgb(118, 118, 118)";
                      if (cur.className.includes('ng-pristine')){
                    cur.style.border = "1px solid red"
                      } else if (cur.className.includes('ng-dirty')){
                    cur.style.border = "1px solid rgb(118, 118, 118)";
                      } 
                    }
          } else if (this.screen === 2) {
              this.goForward()
            } else if (this.screen === 3 && this.signupForm.get('email').valid){
              this.goForward()
              this.submitOk = true;
              } else if (this.screen === 3 
                && this.signupForm.get('email').invalid
                && this.signupForm.get('email').dirty){
                 emailInput.style.border = "1px solid red"
                 } else if (this.screen === 4 && this.signupForm.get('password').valid){
                this.onSubmit()
                  } else if (this.screen === 4 && this.signupForm.get('password').invalid) {
                    passInput.style.border = "1px solid red";
                  }
      
      
     


      // if(this.screen === 1){
      //   section1.style.display = "none";
      //   section2.style.display = "block";
      // } else if(this.screen === 2){
      //   section2.style.display = "none"
      //   section3.style.display = "block"
      //   console.log(this.screen)
      // } else if(this.screen === 3){
      //   section3.style.display = "none"
      //   section4.style.display = "block"
      //   console.log(this.screen)
      // } else if(this.screen === 4){
      //   section4.style.display = "none"
      //   section5.style.display = "block"
      //   console.log(this.screen)
      //   this.submitOk = true;
      // } else if (this.screen === 5){
      //   this.onSubmit(this.form);
      //   console.log(this.form)
      // }   
      
      // if (this.screen === 2){
      //   console.log('console log working section 2')
      //   for (const cur of dateArr) {
      //     cur.style.borderColor = "1px solid lightgray";
      //   if (cur.value === "day" || "month" || "year"){
      //       cur.style.border = "1px solid red";
      //     } else if (cur.value != "day" && cur.value != "month" && cur.value != "year"){
      //       cur.style.border = "1px solid lightgray"
      //       section2.style.display = "none"
      //       section3.style.display = "block"
      //       this.screen = 3;
      //       // console.log(screen)
      //     } 
      //   }
      // } 
      
      // if (this.screen === 3){
      //   for (const cur of genderArr) {
      //     cur.style.borderColor = "1px solid lightgray";
      //     if (cur.className.includes('ng-invalid')){
      //       cur.style.border = "1px solid red"
      //   } else if (cur.className.includes('ng-valid')){
      //       cur.style.borderColor = "1px solid lightgray";
      //       section1.style.display = "none"
      //       section2.style.display = "none"
      //       section3.style.display = "none"
      //       section4.style.display = "block"
      //       section5.style.display = "none"
      //     } 
      //   }
      // } 
      
      // if (this.screen = 4) {
      //     if (emailInput.className.includes('ng-invalid')){
      //       emailInput.style.border = "1px solid red"
      //   } else if (emailInput.className.includes('ng-valid')){
      //       emailInput.style.borderColor = "1px solid lightgray";
      //       section1.style.display = "none"
      //       section2.style.display = "none"
      //       section3.style.display = "none"
      //       section4.style.display = "none"
      //       section5.style.display = "block"
      //       this.submitOk = true;
      //   } 
      // } else if (this.screen = 5){
      //   if (passInput.className.includes('ng-invalid')){
      //     passInput.style.border = "1px solid red"
      //   } else if (passInput.className.includes('ng-valid')){
      //     this.onSubmit(this.form);
      //   } 
      // }
  }

  // evalFirst(){
  //   var nameInputs = document.querySelectorAll<HTMLInputElement>(".input-names");
  //   var namesArr = Array.from(nameInputs)
  //   var section1 = document.querySelector<HTMLElement>(".section-1");
  //   var section2 = document.querySelector<HTMLElement>(".section-2");

  //     for (const cur of namesArr) {
  //       cur.style.borderColor = "1px solid lightgray";
  //       if (cur.className.includes('ng-invalid') && !this.formNames.valid){
  //         cur.style.border = "1px solid red"    
  //     } else if (cur.className.includes('ng-valid') && this.formNames.valid){
  //         cur.style.borderColor = "1px solid lightgray";
  //         section1.style.display = "none";
  //         section2.style.display = "block";
  //         this.screen = 2;
  //       } 
  //     }
  //     console.log('Screen number '+this.screen);
  // }

  nextSection(){
    var sections = document.querySelectorAll<HTMLElement>(".section");
    var sectionsArr = Array.from(sections); 
    
    for(let i = 0; i < sectionsArr.length; i++){
      sectionsArr[i].style.display = "none"
    }
    var stringy = this.screen.toString()
    document.querySelector<HTMLElement>(`div[data-id="${stringy}"]`).style.display = 'block';
  }

  goForward(){
    this.screen++;
    this.nextSection();
  }

  goBack(){
    if(this.screen > 0){
      this.screen--;
      this.nextSection();
    } else {
      this.router.navigate(['/'])
    }
  }

  onCustomChange() {
    this.customGender = !this.customGender;
    this.displayGender = !this.displayGender;
  }

  onGenderChange() {
    console.log(this.customInput)
  }

  onSubmit(){
    console.log(this.signupForm);
  }
}
