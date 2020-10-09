import { Observable, Subject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class SearchService {

searchValue = new Subject<string>();

constructor()  {
    // this.searchValue.subscribe((value) => {
    //     this.query = value
    // });
}

// onSearch(searchValue) {
//     this.searchValue.next(searchValue);
// }

// onSearch(searchValue) {
//     this.query = searchValue;
// }

// getQuery(){
//     return this.query;
// }

}