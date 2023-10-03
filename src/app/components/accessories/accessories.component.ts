import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {

  constructor() {
    if(sessionStorage.getItem("runCarsouel")!="accessoriesReloaded"){
      sessionStorage.setItem("runCarsouel","accessoriesReloaded")
      location.reload();
    }
   }

  ngOnInit(): void {
  }

}
