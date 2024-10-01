import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { map, Observable, tap } from 'rxjs';
import { Task } from '../../interfaces/tasks.interface';
import { TasksService } from '../../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'tasks-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.css'],
  standalone: true,
  imports: [MaterialModule, CommonModule, TaskListComponent, HttpClientModule]
})
export class TaskListPageComponent implements OnInit {

  public tabs = [ 'all', 'pending', 'complete' ];
  public status = '';

  ngOnInit(): void {

  }

  onTabChanged(event: MatTabChangeEvent) {
    const tabIndex = event.index;
    // Cambiar el valor de status basado en el índice de la pestaña seleccionada
    if (tabIndex === 0) {
      this.status = 'all';
    } else if (tabIndex === 1) {
      this.status = 'pending';
    } else if (tabIndex === 2) {
      this.status = 'complete';
    }
  }

}
