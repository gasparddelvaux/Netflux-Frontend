import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Film } from '../../interfaces/film.interface';
import { FilmFormComponent } from '../film-form/film-form.component';
@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [FilmFormComponent],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss'
})
export class FilmListComponent {
  @Output() toggle = new EventEmitter<void>();

  toggleWelcome() {
    this.toggle.emit();
  }

  films: Film[] = [
    {
      id: 1,
      nom: "Inception",
      annee: 2010,
      realisateur: "Christopher Nolan",
      synopsis: "Dom Cobb est un voleur expérimenté, spécialisé dans l'extraction de secrets enfouis au plus profond du subconscient pendant les rêves.",
      cover: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 2,
      nom: "The Shawshank Redemption",
      annee: 1994,
      realisateur: "Frank Darabont",
      synopsis: "Deux hommes condamnés à la prison à vie se lient d'amitié au fil des années, trouvant réconfort et rédemption par la musique et l'espoir.",
      cover: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
    },
    {
      id: 3,
      nom: "Pulp Fiction",
      annee: 1994,
      realisateur: "Quentin Tarantino",
      synopsis: "Différentes histoires entrelacées de criminels, de drogue et de violence à Los Angeles.",
      cover: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
    },
    {
      id: 4,
      nom: "The Dark Knight",
      annee: 2008,
      realisateur: "Christopher Nolan",
      synopsis: "Batman s'associe au procureur Harvey Dent pour tenter de démanteler le crime organisé à Gotham, mais les choses tournent mal.",
      cover: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 5,
      nom: "Forrest Gump",
      annee: 1994,
      realisateur: "Robert Zemeckis",
      synopsis: "L'histoire extraordinaire de Forrest Gump, un homme avec un QI inférieur à la moyenne, qui se retrouve involontairement au centre de nombreux événements historiques.",
      cover: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 6,
      nom: "The Matrix",
      annee: 1999,
      realisateur: "The Wachowskis",
      synopsis: "Un programmeur informatique découvre que le monde dans lequel il vit n'est qu'une simulation contrôlée par des machines intelligentes, et il rejoint une rébellion pour lutter contre elles.",
      cover: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 7,
      nom: "The Godfather",
      annee: 1972,
      realisateur: "Francis Ford Coppola",
      synopsis: "La saga de la famille Corleone, une puissante dynastie criminelle italo-américaine, dirigée par le patriarche Vito Corleone.",
      cover: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 8,
      nom: "Schindler's List",
      annee: 1993,
      realisateur: "Steven Spielberg",
      synopsis: "L'histoire vraie d'Oskar Schindler, un homme d'affaires allemand, qui a sauvé la vie de plus de mille juifs pendant l'Holocauste.",
      cover: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg"
    },
    {
      id: 9,
      nom: "The Lord of the Rings: The Fellowship of the Ring",
      annee: 2001,
      realisateur: "Peter Jackson",
      synopsis: "Un jeune hobbit doit détruire un anneau maléfique pour empêcher le seigneur des ténèbres Sauron de conquérir le monde.",
      cover: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg"
    },
    {
      id: 10,
      nom: "Fight Club",
      annee: 1999,
      realisateur: "David Fincher",
      synopsis: "Un employé de bureau insomniaque forme un club clandestin où les hommes peuvent exprimer leur masculinité à travers des combats physiques.",
      cover: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"
    }
  ];

  showAddForm = false;
  selectedFilm?: Film;

  addFilm(film: Film) {
    const id = this.films[this.films.length - 1].id;
    if (id !== undefined) {
      const newId = id + 1;
      film.id = newId;
      this.films.push(film);
      this.showAddForm = false;
    }
  }

  editFilm(film: Film) {
    const index = this.films.findIndex(l => l.id === film.id);
    if (index !== -1) {
      this.films[index] = film;
      this.selectedFilm = undefined;
    }
  }

  selectFilm(film: Film) {
    this.selectedFilm = film;
  }

  deleteFilm(film: Film) {
    const index = this.films.findIndex(l => l.id === film.id);
    if (index !== -1) {
      this.films.splice(index, 1);
    }
  }
}
