import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';

//Http://localhost:3000
const URL = environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) {
   }
   //Crear nuevo usuario
   newUsuario(formData:RegisterForm){

    return this.http.post(`${URL}/usuarios`, formData, {responseType: 'text'});
   }
}
