import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { dateNotBePast, skillsValidator } from '../../validators/validators';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-task-page',
  templateUrl: './new-task-page.component.html',
  styleUrls: ['./new-task-page.component.css'],
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule]
})
export class NewTaskPageComponent implements OnDestroy {

  private _fb = inject(FormBuilder);
  private _taskService = inject(TasksService);
  private _router = inject(Router);
  private _suscription?: Subscription;

  public skills = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public formTask: FormGroup = this._fb.group({
    taskName: ['', Validators.required],
    deadline: ['', [Validators.required, dateNotBePast]],
    people: this._fb.array([
      this.createPerson()
    ]),
  });

  ngOnDestroy(): void {
    this._suscription?.unsubscribe();
  }

  get people(): FormArray {
    return this.formTask.get('people') as FormArray;
  }

  createPerson(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      skills: this._fb.array([], skillsValidator),
    });
  }

  addPerson(): void {
    this.people.push(this.createPerson());
  }

  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  getSkills(personIndex: number): FormArray {
    const skillsArray = this.people.at(personIndex).get('skills') as FormArray;
    return skillsArray;
  }

  addSkill(personIndex: number, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();  // El valor ingresado en el input

    // Asegúrate de que hay un valor y lo añades
    if ((value || '').trim()) {
      this.getSkills(personIndex).push(this._fb.control(value.trim(), Validators.required));
    }

    // Limpiar el input después de agregar la habilidad
    event.input.value = '';
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  onSubmit() {
    if(this.formTask.invalid) {
      this.formTask.markAllAsTouched();
      return;
    }

    console.log(this.formTask.value);
    this._suscription = this._taskService.postTask(this.formTask.value)
      .subscribe({
        next: task => console.log(task),
        error: error => console.log(error),
        complete: () => console.log('completo')
      });

      this._router.navigate(['/tasks']);
  }

}

