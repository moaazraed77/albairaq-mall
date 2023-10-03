import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss']
})
export class ClothingComponent implements OnInit {

  constructor() {
    if(sessionStorage.getItem("runCarsouel")!="clothingReloaded"){
      sessionStorage.setItem("runCarsouel","clothingReloaded")
      location.reload();
    }
   }

  ngOnInit(): void {
  }

}
