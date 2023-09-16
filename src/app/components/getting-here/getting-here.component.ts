import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getting-here',
  templateUrl: './getting-here.component.html',
  styleUrls: ['./getting-here.component.scss']
})
export class GettingHereComponent implements OnInit {

  constructor() {
    if(sessionStorage.getItem("runCarsouel")!="hereReloaded"){
      sessionStorage.setItem("runCarsouel","hereReloaded")
      location.reload();
    }
   }

  ngOnInit(): void {
  }

}
