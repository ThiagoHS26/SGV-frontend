import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs/operators';

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

   //Login
   login(formData:LoginForm){

    return this.http.post(`${URL}/auth/login`,formData).pipe(tap((res:any)=>{
      localStorage.setItem('token',res.token);
      //console.log(res.token);
    }))
  }
}
