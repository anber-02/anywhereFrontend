export interface Servicio{
  idTiendas?:number,
  idHoteles?:number,
  idRestaurantes?:number,
  nombre:string,
  contacto_correo:string,
  contacto_tel:string,
  direccion:string,
  imagenes: Imagen[]
  comentarios: []
}

interface Imagen{
  nombre:string,
  url?:string,
}