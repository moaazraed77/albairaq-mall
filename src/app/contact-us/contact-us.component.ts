import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor() { 
    if(sessionStorage.getItem("runCarsouel")!="contactReloaded"){
      sessionStorage.setItem("runCarsouel","contactReloaded")
      location.reload();
    }
  }

  ngOnInit(): void {
  }

}
