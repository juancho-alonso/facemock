import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-column',
  templateUrl: './side-column.component.html',
  styleUrls: ['./side-column.component.scss']
})
export class SideColumnComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('curUser'));
  @Input('showCol') showCol:boolean;
  routeName = this.route.snapshot;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.routeName)
    if(this.showCol == true && this.routeName.url[0].path == 'profile') {
      document.getElementById('column-1').style.marginTop = "60px";
      document.getElementById('column-1').style.backgroundColor = "#F0F2F5";
      document.getElementById('column-1').style.height = "90.7vh";
    }
  }

}
