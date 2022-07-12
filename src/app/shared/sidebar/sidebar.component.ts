import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems:any[];

  constructor(private sidebarService: SidebarService, private router:Router) {
    this.menuItems = this.sidebarService.menu;
    console.log(this.menuItems);
   }

  ngOnInit(): void {
  }
  /*Cerrar sesion */
  logout(){
    this.router.navigateByUrl('/login');
  }

}
