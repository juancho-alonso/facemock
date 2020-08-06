import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 32; i++){
      this.days.push(i);
    }
    for (let i = 2020; i < 1900; i--){
      this.years.push(i);
    }
  }

}
