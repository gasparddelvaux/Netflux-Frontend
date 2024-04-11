import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  @Input() selectedMovieDetails: Movie = {
    id: 0,
    name: '',
    director_id: 0,
    director: {
      id: 0,
      firstname: '',
      lastname: '',
      updated_at: new Date(),
      created_at: new Date(),
    },
    year: 0,
    synopsis: '',
    cover: '',
    created_at: new Date(),
    updated_at: new Date(),
  };

  @Output() cancelEmitter = new EventEmitter();

  cancel() {
    this.cancelEmitter.emit();
  }
}
