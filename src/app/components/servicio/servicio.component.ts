import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
})
export class ServicioComponent  implements OnInit {
  @Input() lugares!:any
  @Input() tipo!:any
  url='https://imgs.search.brave.com/ne-HuorKVfDreOpSwQY44K4-HA1NtqFzsZWjXGkbkbc/rs:fit:1200:1067:1/g:ce/aHR0cDovLzIuYnAu/YmxvZ3Nwb3QuY29t/Ly1fYU0zSEdlRjlM/RS9WQWMxM3R3OHRm/SS9BQUFBQUFBQ1RY/Zy9HN2hUOUZERndU/by9zMTYwMC9wYWlz/YWplcyUyQm5hdHVy/YWxlcyUyQi0lMkJu/YXR1cmFsZXphJTJC/LSUyQm5hdHVyYWwl/MkJmcmVlJTJCbGFu/ZHNjYXBlcyUyQi0l/MkJmb3RvcyUyQmRl/JTJCcGFpc2FqZXMl/MkIoNSkuanBn';
 
  isModalOpen = false; 
  id:any
  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.tipo)
  }

  navigate(id:any){ 
    console.log(id)
    let url = this.tipo.slice(0, -1)
    this.router.navigate([`/${url}`, id]);
  }

}
