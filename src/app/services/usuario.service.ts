import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs/operators';
import { CambioPassword } from '../interfaces/cambio-password.interface';
import { EditUsuario } from '../interfaces/edit-user.interface';

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
      localStorage.setItem('UsuarioId', res.usuario.id);
      //console.log(res.token);
    }))
  }

  //obtener token
  get token():string{
    return localStorage.getItem('token');
  }

  //obtener usuarios
  obtenerUsuarios(){
    let headers = new HttpHeaders({
      'token': localStorage.getItem('token')//reemplazar por nuevo metodo get token
    });
    return this.http.get(`${URL}/usuarios`,{headers});
  }

  //Eliminar usuarios
  deleteUsuario(id:string){
    let headers = new HttpHeaders({
      'token':this.token
    });
    return this.http.delete(`${URL}/usuarios/${id}`,{headers});
  }
  //Cambiar contraseña
  cambioPassword(id:string, cambioPass:CambioPassword){
    let headers = new HttpHeaders({
      'token':this.token
    });
    return this.http.put(`${URL}/usuarios/cambio-password/${id}`, cambioPass,{headers, responseType:'text'});
  }

  //editar usuario
  obtenerIdUsuario(id:string){
    let headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.get(`${URL}/usuarios/${id}`,{headers});
  }

  editarUsuario(id:string, editData:EditUsuario){
    let headers = new HttpHeaders({
      'token': this.token
    });
    return this.http.put(`${URL}/usuarios/${id}`, editData, {headers});

  }

}
