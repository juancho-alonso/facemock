import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-sign-up-mobile',
  templateUrl: './sign-up-mobile.component.html',
  styleUrls: ['./sign-up-mobile.component.scss']
})
export class SignUpMobileComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @ViewChild('customInput') customInput;
  signupFormMbl: FormGroup;


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


  constructor(private router: Router,
    private bpo: BreakpointObserver) {   }

  ngOnInit(): void {
    this.signupFormMbl = new FormGroup({
        'firstname': new FormControl(null, Validators.required),
        'surname': new FormControl(null, Validators.required),
        'day': new FormControl('day', Validators.required),
        'month': new FormControl('month', Validators.required),
        'year': new FormControl('year', Validators.required),
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

      if(this.screen === 0 && this.signupFormMbl.get('firstname').valid && this.signupFormMbl.get('surname').valid){
        this.goForward();
      } else if(this.screen === 0 
        && this.signupFormMbl.get('firstname').invalid
        || this.signupFormMbl.get('surname').invalid
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
          && this.signupFormMbl.get('day').dirty
          && this.signupFormMbl.get('month').dirty
          && this.signupFormMbl.get('year').dirty){
            this.goForward()
          } else if ( this.screen === 1 &&
            this.signupFormMbl.get('day').pristine
            || this.signupFormMbl.get('month').pristine
            || this.signupFormMbl.get('year').pristine){
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
            } else if (this.screen === 3 && this.signupFormMbl.get('email').valid){
              this.goForward()
              this.submitOk = true;
              } else if (this.screen === 3 
                && this.signupFormMbl.get('email').invalid
                && this.signupFormMbl.get('email').dirty){
                 emailInput.style.border = "1px solid red"
                 } else if (this.screen === 4 && this.signupFormMbl.get('password').valid){
                this.onSubmit()
                this.router.navigate(["/add-friends"])
                  } else if (this.screen === 4 && this.signupFormMbl.get('password').invalid) {
                    passInput.style.border = "1px solid red";
                  }
    
  }

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
    localStorage.setItem(this.signupFormMbl.value.email, JSON.stringify(this.signupFormMbl.value));
    localStorage.setItem('curUser', JSON.stringify(this.signupFormMbl.value));
    var currentUser = JSON.parse(localStorage.getItem('curUser')); 
    currentUser.relationship = "Single";
    currentUser.birthplace = "Birthplace";
    currentUser.work = "Workplace";
    currentUser.school = "School";
    currentUser.about = "";
    currentUser.currentCity = "City";
    currentUser.friends = [];

    localStorage.setItem("curUser", JSON.stringify(currentUser))

  }
}
