import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //private API_SERVER = 'http://localhost:8080/productos/';
  private API_SERVER = 'https://freshcadito.azurewebsites.net/productos/';

  constructor(private httpClient: HttpClient) { }

  public getAllProductos(): Observable<any>{

  return this.httpClient.get(this.API_SERVER);
  }

  public saveProducto (producto:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,producto);
  }

  public deleteProducto(id:any):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/" + id);
  }


}
