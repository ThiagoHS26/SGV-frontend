import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  usuarios: Usuario[]=[];
  dtTrigger: Subject<any> = new Subject<any>();

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

  constructor(private usuarioSvc:UsuarioService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive:true,
      language:{url:'//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'}
    };
  }

  obtenerUsuario(){
    this.usuarioSvc.obtenerUsuarios().subscribe((res:any)=>{
      this.usuarios =res;
      this.dtTrigger.next();
      //console.log(res);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //Crear usuario
  crearUsuarios(){
    this.formSubmited = true;
    if(this.registerForm.invalid){
      return;
    }
    //Realizar posteo 
    this.usuarioSvc.newUsuario(this.registerForm.value).subscribe(res=>{
      //console.log(res);
      Swal.fire({
        icon:'success',
        title:'Exito',
        text:'Usuario creado',
        showConfirmButton:true
      }).then((result)=>{
        location.reload();//para recargar la pagina y mostrar los datos 
      })
    },(err)=>{
      const errorServer = JSON.parse(err.error);
      Swal.fire('Error',errorServer.message,'error');
    });
  }

  //Eliminar usuario
  eliminarUsuario(id:string){
    Swal.fire({
      icon:'question',
      title:'¿Seguro que quieres eliminar a este usuario?',
      showCancelButton:true,
      confirmButtonText:'Confirmar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.usuarioSvc.deleteUsuario(id).subscribe((res:any)=>{
          Swal.fire({
            icon:'success',
            title:'Usuario eliminado',
            confirmButtonText:'Ok'
          }).then((result)=>{
            if(result){
              location.reload();
            }
          });
        });
      }
    });
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
