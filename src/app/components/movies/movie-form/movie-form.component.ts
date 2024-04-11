import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../../../interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { DirectorService } from '../../../services/director/director.service';
import { Director } from '../../../interfaces/director.interface';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.scss'
})
export class MovieFormComponent {

  constructor(private directorService: DirectorService) { }

  filmForm = new FormGroup({
    cover: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    synopsis: new FormControl('', [Validators.required, Validators.minLength(5)]),
    year: new FormControl('', [Validators.required, Validators.min(1896)]),
    director_id: new FormControl('', Validators.required)
  });

  directorsList: Director[] = [];

  @Output() createEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() cancelEmitter = new EventEmitter();
  @Input() selectedMovie: Movie = {
    id: 0,
    name: '',
    director_id: 0,
    director:
      {
        id: 0,
        firstname: '',
        lastname: '',
        updated_at: new Date(),
        created_at: new Date()
      },

    year: 0,
    synopsis: '',
    cover: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  ngOnInit() {
    this.selectedMovie = this.clone(this.selectedMovie);
    this.loadDirectorsList();
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

  loadDirectorsList() {
    this.directorService.listDirectors()
      .then((response) => {
        if (response.status === 200) {
          this.directorsList = response.data;
          console.log(this.directorsList);
        }
      })
      .catch((error) => {
        console.error(error);
        this.directorsList = [];
      });
  }
}
