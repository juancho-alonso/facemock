import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('curUser'));
  wall = window.location.href.indexOf('wall') > -1;
  showDrop = false;
  showCreateDrop = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navHome() {
    this.router.navigate(["/wall"])
  }

  navProfile() {
    this.router.navigate(["/profile"])
  }

  onDropdown(){
    this.showDrop = !this.showDrop
  }

  onCreateDropdown(){
    this.showCreateDrop = !this.showCreateDrop;
  }
}
