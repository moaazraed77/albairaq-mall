import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.scss']
})
export class StoreLocationComponent implements OnInit {

  constructor() {
    if(sessionStorage.getItem("runCarsouel")!="storeReloaded"){
    sessionStorage.setItem("runCarsouel","storeReloaded")
    location.reload();
  } }

  ngOnInit(): void {
  }

}
