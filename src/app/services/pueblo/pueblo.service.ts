import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import {} from '@capacitor/filesystem'



@Injectable({
  providedIn: 'root'
})
export class PuebloService {

  constructor(private http: HttpClient) { }

  getServicio(tipo: string) {
    return this.http.get(`${environment.API_URL}/${tipo.toLowerCase()}?page=2`);
  }
  getServicioById(id: any, ruta:string) {
    return this.http.get(`${environment.API_URL}/${ruta}/${id}`);
  }

  deleteServicio(id:any, ruta:any){
    return this.http.delete(`${environment.API_URL}/${ruta}/${id}`)
  }

  // --------------------FUNCIONES DE LA TIENDA
  createTienda(formData: any) {
    return this.http.post(`${environment.API_URL}/nuevaTienda`, formData);
  }

  updateTienda(tienda: any, id:any) {
    return this.http.put(`${environment.API_URL}/tienda/${id}`, tienda);
  }

  // ------------------FUNCIONES DEL HOTEL
  createHotel(formData: any) {
    return this.http.post(`${environment.API_URL}/nuevoHotel`,formData);
  }
  updateHotel(tienda: any, id:any) {
    return this.http.put(`${environment.API_URL}/hotel/${id}`, tienda);
  }

    // ------------------FIN DE LAS FUNCIONES DEL HOTEL
  createRestaurante(formData: any) {
    return this.http.post(`${environment.API_URL}/nuevoRestaurante`,formData );
  }

  // COMENTARIOS
  createComment(data:any){
    console.log({data});
    return this.http.post(`${environment.API_URL}/comentario`, data);
  }
}
