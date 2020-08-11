import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

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
    for (let i = 0; i < 32; i++){
      this.days.push(i);
    }
    for (let i = 2020; i < 1900; i--){
      this.years.push(i);
    }
  }

  onSubmit(form: NgForm){
    console.log(form);
  }
}
