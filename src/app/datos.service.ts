import { Producto } from './directiva-for/producto/producto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  url = 'https://tienda-online-8f598-default-rtdb.firebaseio.com/';
  private token = this.loginService.getIdToken();
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  listarProductos(): Observable<{ [llave: string]: Producto }> {
    const url_listar = `${this.url}datos.json?auth=${this.token}`;
    return this.httpClient.get<{ [llave: string]: Producto }>(url_listar);
  }

  guardarProducto(producto: Producto): Observable<any> {
    const url_guardar = `${this.url}datos.json?auth=${this.token}`;
    return this.httpClient.post(url_guardar, producto);
  }

  modificarProducto(producto: Producto, llave: string): Observable<any> {
    const url_modificar = `${this.url}datos/${llave}.json?auth=${this.token}`;
    return this.httpClient.put(url_modificar, producto);
  }

  eliminarProducto(llave: string): Observable<any> {
    const url_eliminar = `${this.url}datos/${llave}.json?auth=${this.token}`;
    return this.httpClient.delete(url_eliminar);
  }
}
