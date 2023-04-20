import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token = new Subject() //->siempre manda un valor
  public tokenPrueba = '';

  constructor(
    private http:HttpClient, 
    private alertController:AlertController,
    private loadingController: LoadingController
    ) { }

  get token(){
    return this._token
  }

  get tokenP(){
    return this.tokenPrueba
  }

leerToken(){
  if(localStorage.getItem('token')){
    let token = JSON.parse(localStorage.getItem('token') || '[]') || "";
    this.tokenPrueba = token.token
    this._token.next(token)
  }else{
    this._token.next('')
  }
}

  login(email:string, password:string){
    this.mostrarLoading()
    this.http.post(`${environment.API_URL}/auth`, {email, password}).
    subscribe((data:any) =>{
      if(data){this.loadingController.dismiss()}
      localStorage.setItem('token', JSON.stringify(data))
      this.leerToken();
    }, (error: any)=>{
      this.loadingController.dismiss()
      this.presentAlert(error.error.error)
    }
    )
  }

  register(data:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(`${environment.API_URL}/register`, data, {headers: headers});
  }

  getUserByID(id:any){
    this.leerToken()
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.tokenPrueba}`)
    return this.http.get(`${environment.API_URL}/user-profile/${id}`, {headers: headers});
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async mostrarLoading(){ //se cra el async para utilizar el loading
    const load= await this.loadingController.create(
      {
        message:`Cargando...`,
        translucent:true,
        spinner:'dots',
      }
    );
    await load.present();
  }
}
