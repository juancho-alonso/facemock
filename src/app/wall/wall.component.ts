import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  userComment:any;

  constructor() { }

  ngOnInit(): void {
  }

  onComment(message){
    this.userComment = message;
    console.log(this.userComment + ' User Comment in Wall component')
  }
}
