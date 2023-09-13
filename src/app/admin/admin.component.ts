import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  hideSideBar:boolean=true;
  constructor(private route:Router,private fb:FormBuilder, private dataServ:DataService , private http:HttpClient) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      this.route.navigate(["/dash-login"])
      this.hideSideBar=false;
    }
   }

  ngOnInit(): void {
  }

}
