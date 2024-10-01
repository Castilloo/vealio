import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { Task } from '../../interfaces/tasks.interface';
import { TasksService } from '../../services/tasks.service';
import { Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'tasks-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [MaterialModule, CommonModule],
})
export class TaskListComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public status: string = '';
  public tasks$ = new Observable<Task[]>;
  public slideStatus = false;
  private _slide$ = new Subscription;

  constructor(private _tasksService: TasksService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['status'] && !changes['status'].isFirstChange()){
      this.status = changes['status'].currentValue;
      console.log(this.status);
      this.tasksByStatus();
    }
  }

  ngOnInit(): void {
    if (!this.tasks$) new Error('Tasks are required');
    this.status = 'all';
    this.tasksByStatus();
  }

  ngOnDestroy(): void {
    this._slide$.unsubscribe();
  }

  tasksByStatus(): void {    
    if (this.status === 'all') {
      this.tasks$ = this._tasksService.allTasks;
    } 
    if (this.status === 'complete') {
      this.tasks$ = this._tasksService.tasksByStatus(true)
    } 
    if(this.status === 'pending') {
      this.tasks$ = this._tasksService.tasksByStatus(false);
    }
  }

  onChangeSlideStatus(value: Task) {
    this._slide$ = this._tasksService.updateTaskStatus(value.id)
      .subscribe({
        next: resp => {
          resp.status;
        },
        error: error => console.log(error),
        complete: () => console.log(true)
      });
      value.status = !value.status;
  }
}
