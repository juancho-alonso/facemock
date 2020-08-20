import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent implements OnInit {

  public showSignUp: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showSignUp = false;
  }

  toggleSignUp(event){
    this.showSignUp = !this.showSignUp;
    console.log(event)
  }
}
