import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  display:boolean=true;
  
  constructor() { }

  ngOnInit(): void {
    if(location.hash.toString().split("").slice(2,6).join("")=="dash"){
      this.display=false;
      sessionStorage.setItem("showHeader","No")
    }
  }

}
