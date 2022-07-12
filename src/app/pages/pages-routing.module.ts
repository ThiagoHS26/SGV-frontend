import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes:Routes=[
  {path:'dashboard',component:PagesComponent,//Ruta padre
    children:[
      {path:'',component:DashboardComponent, data:{titulo:'Dashboard'}},
      {path:'usuarios',component:UsuariosComponent, data:{titulo:'Usuarios'}},
      {path:'productos',component:ProductosComponent, data:{titulo:'Productos'}},
      {path:'ventas',component:VentasComponent, data:{titulo:'Ventas'}},
      {path:'compras',component:ComprasComponent, data:{titulo:'Compras'}},
      {path:'clientes',component:ClientesComponent, data:{titulo:'Clientes'}}
    ]
  }//ruta padre 
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)//Hijas
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
