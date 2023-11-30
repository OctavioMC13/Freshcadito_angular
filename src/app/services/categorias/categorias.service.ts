import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
  {
  providedIn: 'root'
})
export class CategoriasService {

  //private API_SERVER = 'http://localhost:8080/categoria/';
  private API_SERVER = 'https://freshcadito.azurewebsites.net/categoria/';

  constructor(private httpClient: HttpClient) { }

  public getAllCategorias(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
