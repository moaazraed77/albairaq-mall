import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mall-location',
  templateUrl: './mall-location.component.html',
  styleUrls: ['./mall-location.component.scss']
})
export class MallLocationComponent implements OnInit {

  constructor() {
    if(sessionStorage.getItem("runCarsouel")!="MallLocationReloaded"){
      sessionStorage.setItem("runCarsouel","MallLocationReloaded")
      location.reload();
    }
   }

  ngOnInit(): void {
  }

}
