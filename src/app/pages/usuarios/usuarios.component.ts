import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  usuarios: Usuario[]=[];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private usuarioSvc:UsuarioService) { }

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

}
