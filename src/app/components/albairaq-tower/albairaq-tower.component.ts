import { Component, OnInit } from '@angular/core';
import { homePhoto } from 'src/app/interfaces/home.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-albairaq-tower',
  templateUrl: './albairaq-tower.component.html',
  styleUrls: ['./albairaq-tower.component.scss']
})
export class AlbairaqTowerComponent implements OnInit {

  constructor(private dataServ:DataService) {
    if(sessionStorage.getItem("runCarsouel")!="albairaqTowerReloaded"){
      sessionStorage.setItem("runCarsouel","albairaqTowerReloaded")
      location.reload();
    }
   }

  imgSource:any;
  carasoulImages:homePhoto[]=[]
  images:any[]=[];
  seeMoreImgs:boolean=false;
  imageShow:any[]=[];

  ngOnInit(): void {
    this.dataServ.getAlbairaqTowerCarasoul().subscribe(data =>{
      for (const key in data) {
        this.carasoulImages.push(data[key])
      }
    })
    this.dataServ.getAlbairaqTowerImages().subscribe(data =>{
      for (const key in data) {
        this.images.push(data[key])
      }
      // this.images.reverse()
    })
    
    $(function () {
      hide() 
      function hide() {
        $(".showImg").hide();
      }
      $("#close").on("click", hide);
    });
  }

  showProduct(src:homePhoto){
    this.imageShow=[]
    $(function () {
      $(".showImg").show();
    })
    setTimeout(()=> this.imageShow=this.images,50)
    this.imgSource=this.images.indexOf(src);
  }
    
}
