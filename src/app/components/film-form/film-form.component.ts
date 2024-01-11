import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'app-film-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './film-form.component.html',
  styleUrl: './film-form.component.scss'
})
export class FilmFormComponent {
  @Output() createEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Input() selectedFilm: Film = {
    id: 0,
    nom: '',
    realisateur: '',
    annee: 0,
    synopsis: '',
    cover: ''
  }

  ngOnInit() {
    this.selectedFilm = this.clone(this.selectedFilm);
  }

  add() {
    this.createEmitter.emit(this.selectedFilm);
  }

  edit() {
    const toSend = this.clone(this.selectedFilm);
    this.editEmitter.emit(toSend);
  }

  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
  }
}
