import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './layout/components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: SidenavComponent,
    children: [
      { path: 'list', loadComponent: () => import('./tasks/pages/task-list-page/task-list-page.component').then(m => m.TaskListPageComponent) },
      { path: 'new-task', loadComponent: () => import('./tasks/pages/new-task-page/new-task-page.component').then(m => m.NewTaskPageComponent) },
      { path: '**', redirectTo: 'list' },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks/list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
