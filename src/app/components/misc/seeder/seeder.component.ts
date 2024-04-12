import { Component } from '@angular/core';
import { SeederService } from '../../../services/seeder/seeder.service';
import { DirectorService } from '../../../services/director/director.service';
import { MovieService } from '../../../services/movie/movie.service';
import { Director } from '../../../interfaces/director.interface';
import { Movie } from '../../../interfaces/movie.interface';

@Component({
  selector: 'app-seeder',
  standalone: true,
  imports: [],
  templateUrl: './seeder.component.html',
  styleUrl: './seeder.component.css',
})
export class SeederComponent {
  constructor(
    private seederService: SeederService,
    private directorService: DirectorService,
    private movieService: MovieService
  ) {}

  totalMovies: number = 20;
  addedMovies: number = 0;
  progress: number = 0;
  infoBox: string = 'Appuyez sur le bouton pour lancer le seeder';

  async startSeeder() {
    console.log('Seeder started');
    this.infoBox = 'Récupération des films tendances...';
    this.seederService.getTrendingMovies().then((response) => {
      this.infoBox = 'Films récupérés.';
      const trendingMovies = response.data.results;
      trendingMovies.forEach((movie: any) => {
        this.seederService.getMovieCredits(movie.id).then((response) => {
          const director = response.data.crew.filter(
            (member: any) => member.job === 'Director'
          )[0].name;
          const [firstname, lastname] = director.split(' ');
          const db_director: Director = {
            id: 0,
            firstname,
            lastname,
            created_at: new Date(),
            updated_at: new Date(),
          };
          this.infoBox = 'Ajout du réalisateur ' + director + '...';
          this.directorService
            .addDirector(db_director)
            .then((response) => {
              const dbDirectorId = response.data.director.id;
              this.addMovie(dbDirectorId, movie);
            })
            .catch((error) => {
              const dbDirectorId = error.response.data.director.id;
              this.addMovie(dbDirectorId, movie);
            });
        });
      });
    });
    this.infoBox = 'Seeder terminé';
  }

  addMovie(dbDirectorId: number, movie: any) {
    setTimeout(() => {
      const dbMovie: Movie = {
        id: 0,
        name: movie.title,
        director_id: dbDirectorId,
        director: {
          id: 0,
          firstname: '',
          lastname: '',
          updated_at: new Date(),
          created_at: new Date(),
        },
        year: new Date(movie.release_date).getFullYear(),
        cover: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
        synopsis: movie.overview,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.infoBox = 'Ajout du film ' + movie.title + '...';
      this.movieService.addMovie(dbMovie).then((response) => {
        this.addedMovies++;
        this.progress = (this.addedMovies / this.totalMovies) * 100;
        console.log(
          this.addedMovies +
            '/' +
            this.totalMovies +
            ' (' +
            this.progress +
            '%)'
        );
      });
    }, 1000);
  }
}
