import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfumes',
  templateUrl: './perfumes.component.html',
  styleUrls: ['./perfumes.component.scss']
})
export class PerfumesComponent implements OnInit {

  constructor() {
    if(sessionStorage.getItem("runCarsouel")!="perfumesReloaded"){
      sessionStorage.setItem("runCarsouel","perfumesReloaded")
      location.reload();
    }
   }

  ngOnInit(): void {
  }

}
