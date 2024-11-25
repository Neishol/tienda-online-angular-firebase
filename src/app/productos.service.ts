import { DatosService } from './datos.service';
import { Injectable } from '@angular/core';
import { Producto } from './directiva-for/producto/producto.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  listadoProductos: { [llave: string]: Producto } = {};
  listadoActualizado = new Subject<{ [llave: string]: Producto }>();

  constructor(private datosService: DatosService) {
    this.datosService
      .listarProductos()
      .subscribe((datos) => (this.listadoProductos = datos));
  }

  getListadoProductos(): Observable<{ [llave: string]: Producto }> {
    return this.datosService.listarProductos();
  }

  saveProducto(producto: Producto, llave: string | null = null): void {
    if (llave === null) {
      this.datosService
        .guardarProducto(producto)
        .subscribe(() => this.refrescarProductos());
    } else {
      this.datosService
        .modificarProducto(producto, llave)
        .subscribe(() => this.refrescarProductos());
    }
  }

  private refrescarProductos(): void {
    this.getListadoProductos().subscribe(
      (producto: { [llave: string]: Producto }) => {
        this.setProductos(producto);
      }
    );
  }

  setProductos(productos: { [llave: string]: Producto }): void {
    this.listadoProductos = productos;
    this.listadoActualizado.next(this.listadoProductos);
  }

  // if (producto.id === null) {
  //   producto.id = this.idSiguiente++;
  //   this.listadoProductos.push(producto);
  // } else {
  //   const indexProducto = this.listadoProductos.findIndex(
  //     (element) => element.id === producto.id
  //   );
  //   if (indexProducto !== -1) {
  //     this.listadoProductos[indexProducto] = producto;
  //   }
  // }

  getProductoByLlave(llave: string): Producto | undefined {
    return this.listadoProductos[llave];
    // const producto = this.listadoProductos.find(
    //   (producto) => producto.id === id
    // );
    // console.log(producto?.id, producto?.nombre);
    // return producto;
  }

  deleteProducto(llave: string): void {
    //   const index = this.listadoProductos.findIndex((p) => p.id === id);
    //   if (index !== -1) {
    //     this.listadoProductos.splice(index, 1);
    //   }
    this.datosService
      .eliminarProducto(llave)
      .subscribe(() => this.refrescarProductos());
  }
}
