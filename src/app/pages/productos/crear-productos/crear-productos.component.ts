import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})

export class CrearProductosComponent {

  productoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _productoService: ProductoService){
    this.productoForm = this.fb.group({
        producto:  ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio:    ['', Validators.required]
    })
  }

  uploadFiles: Array<File> = [];


  onUpload(): Promise<string> {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        for(let i = 0; i < this.uploadFiles.length; i++){
            formData.append("uploads", this.uploadFiles[i], this.uploadFiles[i].name)
        }
        this._productoService.uploadFile(formData).subscribe(res => {
          console.log('Response:', res);
          resolve(this.uploadFiles[0].name);
      }, error => {
          console.error('Error al subir el archivo:', error);
          reject('Error al subir el archivo');
      });
    });
  }

  onFileChange(e: any){
    //console.log(e);
    this.uploadFiles = e.target.files;
  }

  async agregarProducto(){

    const PRODUCTO: Producto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
      nombreArchivo: await this.onUpload(), 
    }

    console.log(PRODUCTO)

    Swal.fire({
      title: 'Creacion de Producto',
      text: "¿Desea crear el producto?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
          console.log(data);  
          this.router.navigate(['/listar-productos'])
        }) 
      }
    })

    
  }

}
