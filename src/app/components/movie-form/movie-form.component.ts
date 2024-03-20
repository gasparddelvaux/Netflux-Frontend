import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss'
})
export class MovieFormComponent {

  filmForm = new FormGroup({
    cover: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(5)]),
    year: new FormControl('', [Validators.required, Validators.min(1896)]),
    director: new FormControl('', Validators.required)
  });

  @Output() createEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() cancelEmitter = new EventEmitter();
  @Input() selectedMovie: Movie = {
    id: 0,
    name: '',
    director: '',
    year: 0,
    synopsis: '',
    cover: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  ngOnInit() {
    this.selectedMovie = this.clone(this.selectedMovie);
  }

  cancel() {
    this.cancelEmitter.emit();
  }

  add() {
    this.createEmitter.emit(this.selectedMovie);
  }

  edit() {
    const toSend = this.clone(this.selectedMovie);
    this.editEmitter.emit(toSend);
  }

  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }
}
