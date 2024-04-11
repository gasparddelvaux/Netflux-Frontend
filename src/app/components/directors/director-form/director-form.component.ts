import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Director } from '../../../interfaces/director.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-director-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './director-form.component.html',
  styleUrl: './director-form.component.css'
})
export class DirectorFormComponent {

  directorForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  @Output() createEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() cancelEmitter = new EventEmitter();
  @Input() selectedDirector: Director = {
    id: 0,
    firstname: '',
    lastname: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  ngOnInit() {
    this.selectedDirector = this.clone(this.selectedDirector);
  }

  cancel() {
    this.cancelEmitter.emit();
  }

  add() {
    this.createEmitter.emit(this.selectedDirector);
  }

  edit() {
    const toSend = this.clone(this.selectedDirector);
    this.editEmitter.emit(toSend);
  }

  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }
}
