import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  hideSideBar:boolean=true;

  // websiteLinks:string[]=["", "dining", "entertainment", "services", "about", "contactus", "store-location", "clothing", "accessories", "perfumes", "openning-hours", ]

  constructor(private route:Router, private http:HttpClient) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      this.route.navigate(["/not-found"])
      this.hideSideBar=false;
    }

    // route.events.subscribe( val =>{
    //   if( val instanceof NavigationEnd){
    //     let endLink=val.url.split("/").pop()?.toString()!;
    //     if(this.websiteLinks.includes(endLink)){
    //       this.hideSideBar=true;
    //     }else{
    //       this.hideSideBar=false;
    //     }
    //   }
    // })
   }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.removeItem("Admin");
    this.route.navigate(["/"])
  }

}
