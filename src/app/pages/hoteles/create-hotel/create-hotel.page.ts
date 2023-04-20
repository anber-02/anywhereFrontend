import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PuebloService } from '../../../services/pueblo/pueblo.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.page.html',
  styleUrls: ['./create-hotel.page.scss'],
})
export class CreateHotelPage implements OnInit {

  hotelForm:FormGroup = new FormGroup({})
  id: any
  msgError:any = ''
  constructor(
    private route:ActivatedRoute,
    private puebloService:PuebloService,
    private router:Router,
    private toastController:ToastController,
    private formBuilder: FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
  ) { }

  ngOnInit() {
    this.initialForms()
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.id = id
      if(this.id){
        this.getHotelById()
      }
    });
  }
  guardarProducto(id?:any) {
    if (this.imagenes.length <= 0) {
      this.msgError = "Ingrese minimo una imagen para continuar";
    }

    if (this.hotelForm.valid && this.imagenes.length > 0) {
      this.msgError = ""
      if(this.id){
        console.log('de que entro aqui')
        this.puebloService.updateHotel(this.hotelForm.value, this.id).subscribe(data=>{
          this.presentToast('Producto actualizado correctamente', 'bottom', 'check')
          this.router.navigate(['/vista-admin'])
        })
      }else{
        const formData = this.getDataForm()
        this.puebloService.createHotel(formData).subscribe((data) => {
          console.log(data)
          if (data) {
            this.loadingController.dismiss()
            this.router.navigate(['/vista-admin'])
          }
        },(error:any)=>{
          console.log(error.error)
          if(error.error.errors.contacto_correo){
            this.presentAlert("Correo ya registrado. Ingrese un nuevo correo para continuar");
          }
          this.loadingController.dismiss()
        }
        )
      }
    }
  }


  initialForms() {
    this.hotelForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(20)]],
      contacto_correo: ['', [Validators.required, Validators.email]],
      contacto_tel: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
    })
  }
  
  getHotelById(){
    this.puebloService.getServicioById(this.id, 'hotel').subscribe((data:any) => {
      console.log(data.data)
      this.hotelForm.reset(data.data)//resetea el formulario y lo rellena con los datos recicbidos
    })
  }

  async presentToast(message: string, position: 'bottom' | 'top', icon:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon
    })
    await toast.present()
  }


  getDataForm(){
    const formData = new FormData()
        let i = 0
        this.imagenes.forEach(image => {          
          let imageBlob = this.convertDataURItoBlob(image.dataUrl)
          formData.append(`imagen[${i}]`, imageBlob)
          i++
        })
        formData.append('nombre', this.hotelForm.value.nombre)
        formData.append('direccion', this.hotelForm.value.direccion)
        formData.append('contacto_correo', this.hotelForm.value.contacto_correo)
        formData.append('contacto_tel', this.hotelForm.value.contacto_tel)

        return formData
  }


  convertDataURItoBlob(dataURI: any) {
    let byteString = atob(dataURI.split(',')[1])

    let mimeString = dataURI.split(',')[0].split(':')[1].split(";")[0]

    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
  }

  removeImage(id:any){
    this.imagenes.splice(id, 1)
  }

  imagenes: any[] = []

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    // const base64Image = `data:image/jpeg;base64,${image.base64String}`
    // let img = this.convertDataURItoBlob(image.dataUrl)
    // this.image = img
    this.imagenes.unshift(image)
  };

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

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
