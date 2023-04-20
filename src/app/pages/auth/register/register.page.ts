import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerData:FormGroup = new FormGroup({})

  token:any

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private route:Router,
    private alertController:AlertController,
    private loadingController:LoadingController,
  ) {
    this.authService.token.subscribe((res:any)=>{
      this.token = res.token
      if(this.token.length > 0){
        this.route.navigate(['/home'])
      }
    })
    this.authService.leerToken()
  }


  ngOnInit(): void {
   this.initialForms()
  }

  initialForms() {
    this.registerData = this.formBuilder.group({
      email: ['luis@gmail.com', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['123456789', [Validators.required, Validators.minLength(8)]],
      name: ['luis', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
      last_name: ['mendoza', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z ]*')]],
      num_tel: ['9512312594', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

  register() {
    if (this.registerData.valid) {
      this.mostrarLoading()
        this.authService.register(this.registerData.value).subscribe((data) => {
          console.log(data)
          if(data){
            this.loadingController.dismiss()
            this.route.navigate(['/login'])
          }
        }, (error: any)=>{
          if(error.error.errors.email){
            this.presentAlert("Correo ya registrado...");
          }
          this.loadingController.dismiss()
        }
        )
    }
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
