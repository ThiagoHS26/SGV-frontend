import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]

  });

  constructor(private router:Router, private fb:FormBuilder, private usuarioSvc:UsuarioService) { }

  login(){
    console.log(this.loginForm.value);
    this.usuarioSvc.login(this.loginForm.value).subscribe(res =>{
      //localstorage
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email',this.loginForm.get('email').value);

      }else{
        localStorage.removeItem('email');
      }

      //redireccion
      this.router.navigateByUrl('/dashboard');

      //console.log(res);
    }, (err)=>{
      Swal.fire('Error',err.error.message,'error');
    });
  }

}
