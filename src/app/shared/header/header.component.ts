import { Component, OnInit, ViewChild } from '@angular/core';
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

  currentUser = JSON.parse(localStorage.getItem('curUser'));
  wall = window.location.href.indexOf('wall') > -1;
  showDrop = false;
  showCreateDrop = false;
  activeSearch = false;
  result: Subject<any> = new Subject;
  valueToChild: Observable<any> = new Observable<any>((observer)=>{
    observer.next(this.searchInput.nativeElement.value);
  });
  show;

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
    console.log(this.result)
    this.searchService.searchValue.next(this.searchInput.nativeElement.value)
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

  onToggleSearch(){
    this.activeSearch = !this.activeSearch;
    console.log(this.searchInput.nativeElement.value)
    
  }
}
