import { Component, OnInit } from '@angular/core';
import { homePhoto } from '../../interfaces/home.interface';
import * as $ from 'jquery';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="homeReloaded"){
      sessionStorage.setItem("runCarsouel","homeReloaded")
      location.reload();
    }
   }

  imgSource:string="";
  carasoulImages:homePhoto[]=[]
  images:homePhoto[]=[];
  seeMoreImgs:boolean=false;

  ngOnInit(): void {
    this.dataServ.getCarsoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.gethomeImages().subscribe(data =>{
      for (const key in data) {
        this.images.push(data[key])
      }
    })
    $(function () {
      hide() 
      function hide() {
          $(".showImg").hide();
      }
      $("#close").on("click", hide);
    });
  }

  seeMore(){
    this.seeMoreImgs=true;
  }
  showProduct(src:string){
    $(function () {
      $(".showImg").show();
    })
    this.imgSource=src;
  }
    
}




// jquery example how to work
// $(function () {
//   function addClass() {
//       $("#div1").addClass("divStyled");
//   }
//   function removeClass() {
//       $("#div1").removeClass("divStyled");
//   }
//   function toggleClass() {
//       $("#div1").toggleClass("divStyled pStyled");
//   }
//   function CSS1() {
//       var padding = $("#div1").css("padding-left");
//       $("#p2").html(padding);

//   }

//   $("#btnClick1").on("click", addClass);
//   $("#btnClick2").on("click", removeClass);
//   $("#btnClick3").on("click", toggleClass);
//   $("#btnClick4").on("click", CSS1);
// }); 