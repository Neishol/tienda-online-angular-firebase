import { Component, Input } from '@angular/core';
import { Producto } from './producto.model';
import { ProductosService } from '../../productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent {
  @Input() producto!: Producto;
  @Input() llave!: string;

  constructor(private router: Router) {}

  editarProducto() {
    //Pasamos el ID por la URL
    this.router.navigate(['/editar', this.llave]);
  }
}
