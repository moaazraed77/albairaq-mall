import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private auth:Auth, private route:Router) { }

  userId:any="";

  error:boolean=false;

  login(data:any){
   return signInWithEmailAndPassword(this.auth,data.email,data.pass).then((user)=>{
      this.userId=user.user.uid;
      sessionStorage.setItem("Admin","AdminisTrue");
      this.route.navigate(["/admin/dash"])
    })
  }
}
