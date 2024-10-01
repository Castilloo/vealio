import { Component } from '@angular/core';

@Component({
  selector: 'layout-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [
    `li { cursor: pointer; } 
    .tool-black{ background-color: #212121; color: white; }
  `]

})
export class SidenavComponent {

  public sidenavItems =  [
    { label: 'Lista de tareas', icon: 'label', url: '/tasks/list' },
    { label: 'Nueva tarea', icon: 'add', url: '/tasks/new-task' },
    // { label: 'Buscar', icon: 'search', url: './search' },
  ]



}
