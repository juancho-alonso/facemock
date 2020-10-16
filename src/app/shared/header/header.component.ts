import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { SearchService } from 'src/app/shared/header/search-view/search.service';
import { Observable, Subject } from 'rxjs';
import { ApplicationRef } from '@angular/core'

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

  constructor(private router:Router,
              public usersList: UsersService,
              public searchService: SearchService,
              public ref: ApplicationRef) { }

  ngOnInit(): void {
    
  }

  searchCall(e){
    this.show = true;
    if (this.searchInput.nativeElement.value == "") {
      this.show = false;
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
    this.searchDisplay = true;
    document.getElementById('search').style.display = "flex";  
  }
  
  onShowMenuMbl() {
    // document.getElementById('column-1').classList.add('menu-mbl')
    this.showColumn = !this.showColumn;
    console.log(this.showColumn)
    this.toggleColumn.emit(this.showColumn)
  }
}
