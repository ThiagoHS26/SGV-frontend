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
    nombre: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    passwordConfirm: ['',[Validators.required]],
    role: ['',[Validators.required]]
  },{
    validators: this.passwordIguales('password','passwordConfirm')
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
        this.router.navigateByUrl('/login');
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

    //Validaciones de los campos
    campoNoValido(campo:string):boolean{

      if(this.registerForm.get(campo).invalid && this.formSubmited){
        return true;
      }else{
        return false;
      }

    }
    //Validacion de contraseña
    contrasenasNoValidas(){
      const pass1 = this.registerForm.get('password').value;
      const pass2 = this.registerForm.get('passwordConfirm').value;

      if((pass1 !== pass2)&&(this.formSubmited)){
        return true;
      }else{
        return false;
      }
    }

    passwordIguales(pass1Name:string, pass2Name:string){
      return (formGroup : FormGroup)=>{
        const pass1Control = formGroup.get(pass1Name);
        const pass2Control = formGroup.get(pass2Name);

        if(pass1Control.value === pass2Control.value){
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors({noEsIgual:true});
        }

      }
    }

}
