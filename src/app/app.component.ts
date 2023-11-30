import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from './services/categorias/categorias.service';
import { ProductoService } from './services/producto/producto.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  productoForm: FormGroup;
  categorias: any;
  productos: any;



  constructor(
    public fb: FormBuilder,
    public categoriasService: CategoriasService,
    public productoService: ProductoService,

  ) {
  }
  ngOnInit(): void {

    this.productoForm = this.fb.group(
      {
        id: [''],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        fecha: ['', Validators.required],
        precio: ['', Validators.required],
        categoria: ['', Validators.required],
      });;

    this.categoriasService.getAllCategorias().subscribe(resp => {
      this.categorias = resp;
    },
      error => { console.error(error) }
    );

    this.productoService.getAllProductos().subscribe(resp => {
      this.productos = resp;


    },
      error => { console.error(error) }
    );
  }



  guardar(): void {
    this.productoService.saveProducto(this.productoForm.value).subscribe(resp => {
      this.productoForm.reset();
      this.productos=this.productos.filter((producto: { id: any; })=> resp.id!==producto.id);
      this.productos.push(resp);

    },
      error => { console.error(error) }
    )
  }

  eliminar(producto: { id: any; }){
    this.productoService.deleteProducto(producto.id).subscribe(resp=>{
      //console.log(resp)
      if(resp===true){
        this.productos.pop(producto)
      }
    })
  }

  editar(producto: { id: any; nombre: any; descripcion: any; fecha: any; precio: any; categoria: any; }){
    this.productoForm.setValue({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      fecha: producto.fecha,
      precio: producto.precio,
      categoria: producto.categoria,
    })
  }
}
