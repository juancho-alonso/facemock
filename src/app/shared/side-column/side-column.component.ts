import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-column',
  templateUrl: './side-column.component.html',
  styleUrls: ['./side-column.component.scss']
})
export class SideColumnComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('curUser'));
  @Input('showCol') showCol:boolean;


  constructor() { }

  ngOnInit(): void {
  }

}
