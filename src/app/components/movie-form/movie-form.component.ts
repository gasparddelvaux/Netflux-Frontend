import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss'
})
export class MovieFormComponent {
  @Output() createEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
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
