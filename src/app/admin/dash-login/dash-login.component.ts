import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-login',
  templateUrl: './dash-login.component.html',
  styleUrls: ['./dash-login.component.scss']
})
export class DashLoginComponent implements OnInit {

  constructor(private fb:FormBuilder ,private route:Router) { 
    if(sessionStorage.getItem("showHeader")=="yes"){
      location.reload()
    }
  }

  login=this.fb.group({
    email:["",Validators.required],
    pass:["",Validators.required],
  })

  ngOnInit(): void {
  }

  submit(){
    if(this.login.get("email")?.value=="admin@admin" && this.login.get("pass")?.value=="admin2023"){
      sessionStorage.setItem("Admin","AdminisTrue");
      this.route.navigate(["/dash"])
    }else{
      sessionStorage.setItem("Admin","isFalse")
    }
  }
}
