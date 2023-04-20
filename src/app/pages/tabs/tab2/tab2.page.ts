import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GmapsService } from 'src/app/services/gmaps/gmaps.service';
import {Loader} from '@googlemaps/js-api-loader'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{


  @ViewChild('map',{static:true}) mapElementRef!:ElementRef;
  googleMaps:any
  // 16.8019547,-96.4400426
  center= {lat:16.8019547, lng:-96.4400426}//ubicacion que renderizara el mapa
  map:any
  constructor(
    private gMpasService: GmapsService,
    private render:Renderer2
    ) {}

  ngOnInit(): void {
      
  }
  ngAfterViewInit(){
    this.loadMap()
  }


  async loadMap(){
    // prueba uno
    // try{
    //   let googleMaps:any = await this.gMpasService.loadGoogleMaps()
    //   this.googleMaps = googleMaps
      const mapElement = this.mapElementRef.nativeElement
    //   const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
    //   this.map = new googleMaps.Map(mapElement, {
    //     center : location,
    //     zome:12
    //   })
    //  this.render.addClass(mapElement,'visible') 
    // }catch(e){
    //   console.log(e)
    // }
    // prueba dos
    try{
      const loader = new Loader({
        apiKey: environment.googleMapsApiKey,
        version: "weekly",
      });
      loader.load().then(() => {
        this.map = new google.maps.Map(mapElement, {
          center: this.center,
          zoom: 15,
        });
      });
  
      this.render.addClass(mapElement,'visible') 
    }catch(e){
      console.log(e)
    }
  }

}
