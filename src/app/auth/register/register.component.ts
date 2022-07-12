import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formSubmited = false;
  //roles
  Roles: any = ['admin', 'editor'];

  //Form Group
  public registerForm = this.fb.group({
    nombre: ['Santiago Heredia',[Validators.required]],
    email: ['santiagoheredia6@gmail.com',[Validators.required, Validators.email]],
    password: ['Angelique2015',[Validators.required]],
    passwordConfirm: ['Angelique2015',[Validators.required]],
    role: ['',[Validators.required]],
  });
  constructor(private fb:FormBuilder, private router:Router, private usuarioSvc: UsuarioService) {

    }

    //crear usuario
    crearUsuario(){
      this.formSubmited = true;
      if(this.registerForm.invalid){
        return;
      }
      //Realizar posteo
      this.usuarioSvc.newUsuario(this.registerForm.value).subscribe(res =>{
        Swal.fire('Exito','Usuario creado correctamente','success');
        //console.log(res);
      }, (e:any)=>{
        const errorServer = JSON.parse(e.error);
        Swal.fire('Error', errorServer.message, 'error');
        //console.log(errorServer);
      });
      //console.log(this.registerForm.value);
    }

    //Traer Roles
    get roles(){
      return this.registerForm.get('role');
    }
    //Evento cambio de role
    changeRole(evento){
      console.log(evento.target.value);
      this.roles.setValue(evento.target.value, {
        onlySelf:true
      });
    }

}
