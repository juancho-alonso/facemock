import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { SearchService } from 'src/app/shared/header/search-view/search.service';
import { Observable, Subject } from 'rxjs';
import { ApplicationRef } from '@angular/core'
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[UsersService, SearchService]
})
export class HeaderComponent implements OnInit {


  @ViewChild('search') searchInput;
  @ViewChild('searchBar') searchBar;
  @Output() toggleColumn = new EventEmitter();

  currentUser = JSON.parse(localStorage.getItem('curUser'));
  wall = window.location.href.indexOf('wall') > -1;
  showDrop = false;
  showCreateDrop = false;
  result: Subject<any> = new Subject;
  valueToChild: Observable<any> = new Observable<any>((observer)=>{
    observer.next(this.searchInput.nativeElement.value);
  });
  show;
  searchDisplay:boolean = false;
  matchesFound = 0;
  matched = false;
  showColumn = false;
  mobile:boolean;

  constructor(private router:Router,
              public usersList: UsersService,
              private bpo: BreakpointObserver,
              public searchService: SearchService,
              public ref: ApplicationRef) { }

  ngOnInit(): void {
    if (this.bpo.isMatched('(max-width: 490px)')) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  searchCall(e){
    this.show = true;
    document.getElementById('search-box').style.display = "none";
    if (this.searchInput.nativeElement.value == "") {
      this.show = false;
      document.getElementById('search-box').style.display = "flex";

    }
    this.result = this.searchInput.nativeElement.value
    this.searchService.searchValue.next(this.searchInput.nativeElement.value)
    
    for (let i= 0; i < this.usersList.users.length; i++) {
      if(this.usersList.users[i].firstname.includes(this.searchInput.nativeElement.value) ||
       this.usersList.users[i].firstname.toUpperCase().includes(this.searchInput.nativeElement.value)|| 
       this.usersList.users[i].firstname.toLowerCase().includes(this.searchInput.nativeElement.value) ||
      this.usersList.users[i].surname.includes(this.searchInput.nativeElement.value) || 
      this.usersList.users[i].surname.toUpperCase().includes(this.searchInput.nativeElement.value)|| 
      this.usersList.users[i].surname.toLowerCase().includes(this.searchInput.nativeElement.value)) {
        this.matchesFound++;
      } 
    }

    if(this.matchesFound != 0) {
      this.matched = true;
      this.matchesFound = 0;
    } else {
      this.matched = false;
    }
  }

  navHome() {
    this.router.navigate(["/wall"])
  }

  navProfile() {
    this.router.navigate(["/profile"])
  }

  onDropdown(){
    this.showDrop = !this.showDrop;
  }

  onCreateDropdown(){
    this.showCreateDrop = !this.showCreateDrop;
  }

  onToggleSearchBar(){
    this.searchDisplay = !this.searchDisplay;
    if(this.searchDisplay == true){
      document.getElementById('search-icon-and-input').style.width = '290px';  

      setTimeout(() => {
        document.getElementById('search').style.display = "flex";
      }, 300);
      if(this.mobile == true) {
        console.log('log')
        document.getElementById('search-box').style.paddingLeft = "5px"
      }
    } else if (this.searchDisplay == false) {
      document.getElementById('search').style.display = "none";
      document.getElementById('search-icon-and-input').style.width = '40px';  
      if(this.mobile == true) {
        document.getElementById('search-box').style.paddingLeft = "0px"
      }
    }
  }
  
  closeSearch(){
    this.searchInput.nativeElement.value = "";
      this.show = false;
      document.getElementById('search-box').style.display = "flex";
  }

  onShowMenuMbl() {
    this.showColumn = !this.showColumn;
    this.toggleColumn.emit(this.showColumn)
  }

  
}
