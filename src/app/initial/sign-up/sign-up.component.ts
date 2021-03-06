import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers:[UsersService]
})
export class SignUpComponent implements OnInit {

  // Toggle variable for signup modal  
  toggleRegister = true;
  // View customInput form
  @ViewChild('customInput') customInput;

  // Defined form variables
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
              }  
  ]

  genders = ["Female", "Male"];
  
  defaultDay = "day";
  defaultMonth = "month";
  defaultYear = "year";
  defaultPronoun = "pronoun";
  displayGender = false;
  

  constructor(private router: Router,
              public usersList: UsersService) {}

  ngOnInit(): void {
    // Defined reactive form 
    this.signupForm = new FormGroup({
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

    // Create days dropdown
    for (let i = 1; i < 32; i++){
      this.days.push(i);
    };
    // Create years dropdown
    for (let j = 2020; j > 1900; j--){
      this.years.push(j);
    }
  }

  onSubmit(){
    // Stores the current user in localStorage, using its email as name
    localStorage.setItem(this.signupForm.value.email, JSON.stringify(this.signupForm.value));
    // Sets the current user's form object as 'curUser'
    localStorage.setItem('curUser', JSON.stringify(this.signupForm.value));
    // Assigns 'curUser' to var 'currentUser'
    var currentUser = JSON.parse(localStorage.getItem('curUser'));
    // Set default values for everal currentUser fields 
    currentUser.relationship = "Single";
    currentUser.birthplace = "Birthplace";
    currentUser.work = "Workplace";
    currentUser.school = "School";
    currentUser.about = "";
    currentUser.currentCity = "City";
    currentUser.friends = [];
    // Overwrites 'curUser'
    localStorage.setItem("curUser", JSON.stringify(currentUser))

  }

  onGenderChange(e) {
    // Toggles gender display
    if(e.target.value === 'custom'){
      this.displayGender = !this.displayGender;
  
    } else {
      this.displayGender = false;
    }
  }

  onValidateForm(){
    // Validates and verifies every input in the form    // Create days dropdown
    var inputs = document.querySelectorAll<HTMLInputElement>(".signup-input");
    var inputsArr = Array.from(inputs)
    var dateInputs = document.querySelectorAll<HTMLOptionElement>(".date-input")
    var dateArr = Array.from(dateInputs);

      for (const cur of inputsArr) { 
        if (cur.classList.contains('ng-invalid')){
            cur.style.border = "1px solid red";
          } else if (cur.classList.contains('ng-valid')) {
              cur.style.border = "none";
          } 
      }
      for (const cur of dateArr) {
        if (this.signupForm.get('day').dirty
            && this.signupForm.get('month').dirty
            && this.signupForm.get('year').dirty){
              cur.style.border = "1px solid rgb(118, 118, 118)";
          } else if ( 
            this.signupForm.get('day').pristine
            || this.signupForm.get('month').pristine
            || this.signupForm.get('year').pristine){
                  for (const cur of dateArr) {
                  cur.style.border = "1px solid rgb(118, 118, 118)";
                      if (cur.className.includes('ng-pristine')){
                    cur.style.border = "1px solid red"
                      } else if (cur.className.includes('ng-dirty')){
                    cur.style.border = "1px solid rgb(118, 118, 118)";
                      } 
                    }
          }
      }
      if (this.signupForm.valid && this.signupForm.get('day').dirty
      && this.signupForm.get('month').dirty
      && this.signupForm.get('year').dirty) {
        this.onSubmit();
        this.router.navigate(["/add-friends"]);
      }      
  }

  closeForm(){
    // Toggles form display
    this.toggleRegister = !this.toggleRegister
  }
  

}


