import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-comentario',
  templateUrl: './card-comentario.component.html',
  styleUrls: ['./card-comentario.component.scss'],
})
export class CardComentarioComponent  implements OnInit {
  @Input() comentario:any;
  userData = JSON.parse(localStorage.getItem('token') || '[]').user || "";
  url = "https://imgs.search.brave.com/m4ino6T270yZ3hKZbrJtQplpOEwSb2uWHfrMOIUN7yU/rs:fit:1200:933:1/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy8xNDAwLzM1YWY2/YTQxMzMyMzUzLjU3/YTFjZTkxM2U4ODku/anBn"
  constructor() {
  }
  ngOnInit() {
    // console.log(this.comentario)
  }

}
