import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Task } from '../interfaces/tasks.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly _baseUrl = 'http://localhost:3000/tasks';

  constructor(private _http: HttpClient) { }

  get allTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this._baseUrl);
  }

  tasksByStatus(status: boolean): Observable<Task[]> {
    return this.allTasks.pipe(
      map(tasks => tasks.filter(task => task.status === status)),
      tap(console.log)
    );
  }

  getTaskById(id: number) : Observable<Task> {
    return this._http.get<Task>(`${ this._baseUrl }/${ id }`);
  }

  updateTaskStatus(id: number): Observable<Task> {
    return this.getTaskById(id)
      .pipe(
        switchMap(task => {
          const newTask =  { ...task, status: !task.status };
          return this._http.put<Task>(`${this._baseUrl}/${ id }`, newTask);
        }),
        tap(console.log)
      );
  }
  
  postTask(newTask: Task) : Observable<Task> {
    return this._http.post<Task>(`${ this._baseUrl }`, {...newTask, status: false});
  }
}
