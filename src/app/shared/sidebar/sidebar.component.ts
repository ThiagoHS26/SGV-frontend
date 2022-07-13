import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
//import * as $ from 'jquery';

declare var $:any;

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
    $('[data-widget="treeview"]').Treeview('init');
  }
  /*Cerrar sesion */
  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
