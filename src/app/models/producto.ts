export class Producto {

    _id?: string;
    producto: string;
    categoria: string;
    ubicacion: string;
    precio: number;
    nombreArchivo?: string;

    constructor(producto:string, categoria:string, ubicacion: string, precio: number, nombreArchivo: string){
        this.producto = producto;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
        this.nombreArchivo = nombreArchivo;
    }

}