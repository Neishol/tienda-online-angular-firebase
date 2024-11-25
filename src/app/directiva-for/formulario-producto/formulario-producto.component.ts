import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../producto/producto.model';
import { ProductosService } from '../../productos.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css',
})
export class FormularioProductoComponent {
  llaveProducto: string | null = null;
  descripcionInput: string = '';
  precioInput: number | null = null;

  constructor(
    private productoService: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const llave = this.route.snapshot.paramMap.get('llave');
    if (llave) {
      const producto = this.productoService.getProductoByLlave(llave);
      if (producto) {
        this.llaveProducto = llave;
        this.descripcionInput = producto.descripcion;
        this.precioInput = producto.precio;
      }
    }
  }

  guardarProducto($event: Event): void {
    $event.preventDefault();

    const descripcion = this.descripcionInput;
    const precio = this.precioInput;

    if (
      descripcion.trim() === '' ||
      precio == null ||
      precio <= 0 ||
      isNaN(precio)
    ) {
      console.log('Ingrese datos validos');
      return;
    }

    this.productoService.saveProducto(
      new Producto(descripcion, precio),
      this.llaveProducto
    );

    this.llaveProducto = null;
    this.descripcionInput = '';
    this.precioInput = null;

    this.router.navigate(['']);
  }

  cancelar(): void {
    this.router.navigate(['']);
  }

  eliminarProducto(): void {
    if (this.llaveProducto !== null) {
      this.productoService.deleteProducto(this.llaveProducto);

      this.llaveProducto = null;
      this.descripcionInput = '';
      this.precioInput = null;

      this.router.navigate(['']);
    } else {
      console.log('Error');
    }
  }
}
