import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';

@Component({
  selector: 'app-create-tienda',
  templateUrl: './create-tienda.page.html',
  styleUrls: ['./create-tienda.page.scss'],
})
export class CreateTiendaPage implements OnInit {


  tiendaForm: FormGroup = new FormGroup({})
  id: any
  image: any
  msgError: any = ''

  constructor(
    private route: ActivatedRoute,
    private puebloService: PuebloService,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
  ) { }

  ngOnInit() {
    this.initialForms()
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.id = id
      if (this.id) {
        this.getTiendaById()
      }
    });
  }
  guardarProducto(id?: any) {
    if (this.imagenes.length <= 0) {
      this.msgError = "Ingrese minimo una imagen para continuar";
    }
    if (this.tiendaForm.valid && this.imagenes.length > 0) {
      this.msgError = ""
      if (this.id) {
        console.log('de que entro aqui')
        this.puebloService.updateTienda(this.tiendaForm.value, this.id).subscribe(data => {
          this.presentToast('Tienda actualizada correctamente', 'bottom', 'check')
          this.router.navigate(['/vista-admin'])
        })
      } else {
        const formData = this.getDataForm()
        this.mostrarLoading()
        this.puebloService.createTienda(formData).subscribe((data) => {
          console.log(data)
          if (data) {
            this.loadingController.dismiss()
            this.router.navigate(['/vista-admin'])
          }
        }, (error:any)=>{
          console.log(error.error)
          if(error.error.errors.contacto_correo){
            this.presentAlert("Correo ya registrado. Ingrese un nuevo correo para continuar");
          }
          this.loadingController.dismiss()
        })
      }
    }
  }

  getDataForm() {
    const formData = new FormData()
    let i = 0
    this.imagenes.forEach(image => {
      let imageBlob = this.convertDataURItoBlob(image.dataUrl)
      formData.append(`imagen[${i}]`, imageBlob)
      i++
    })
    formData.append('nombre', this.tiendaForm.value.nombre)
    formData.append('direccion', this.tiendaForm.value.direccion)
    formData.append('contacto_correo', this.tiendaForm.value.contacto_correo)
    formData.append('contacto_tel', this.tiendaForm.value.contacto_tel)

    return formData
  }


  initialForms() {
    this.tiendaForm = this.formBuilder.group({
      nombre: ['prueba', Validators.required],
      direccion: ['prueba', [Validators.required, Validators.minLength(20)]],
      contacto_correo: ['prueba@gmail.com', [Validators.required, Validators.email]],
      contacto_tel: ['0123456789', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
    })
  }

  getTiendaById() {
    this.puebloService.getServicioById(this.id, 'tienda').subscribe((data: any) => {
      this.tiendaForm.reset(data.data)//resetea el formulario y lo rellena con los datos recicbidos
      this.imagenes = data.data.imagenes
    })
  }

  async presentToast(message: string, position: 'bottom' | 'top', icon: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon
    })
    await toast.present()
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

  removeImage(id: any) {
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
