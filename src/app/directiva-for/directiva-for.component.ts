import { Component } from '@angular/core';
import { FormularioProductoComponent } from './formulario-producto/formulario-producto.component';
import { ProductoComponent } from './producto/producto.component';
import { Producto } from './producto/producto.model';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-directiva-for',
  standalone: true,
  imports: [ProductoComponent],
  templateUrl: './directiva-for.component.html',
  styleUrl: './directiva-for.component.css',
})
export class DirectivaForComponent {
  listadoProductos: { [llave: string]: Producto } = {};
  productosSubscription: Subscription | null = null;

  constructor(
    private productoService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();

    this.productosSubscription =
      this.productoService.listadoActualizado.subscribe(
        (productos) => (this.listadoProductos = productos)
      );
  }

  cargarProductos(): void {
    this.productoService
      .getListadoProductos()
      .subscribe((listadoProductos: { [llave: string]: Producto }) => {
        this.listadoProductos = listadoProductos;
        this.productoService.setProductos(listadoProductos);
      });
  }

  obtenerLlaves(): string[] {
    if (this.listadoProductos) {
      return Object.keys(this.listadoProductos);
    }
    return [];
  }

  agregarProducto(): void {
    this.router.navigate(['agregar']);
  }

  ngOnDestroy(): void {
    if (this.productosSubscription != null) {
      this.productosSubscription.unsubscribe();
    }
  }
}
