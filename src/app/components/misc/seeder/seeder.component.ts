import { Component } from '@angular/core';
import { SeederService } from '../../../services/seeder/seeder.service';
import { DirectorService } from '../../../services/director/director.service';
import { MovieService } from '../../../services/movie/movie.service';
import { Director } from '../../../interfaces/director.interface';
import { Movie } from '../../../interfaces/movie.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seeder',
  standalone: true,
  imports: [FormsModule],
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
  apiPage: number = 1;

  async startSeeder() {
    console.log('Seeder started');
    this.infoBox = 'Récupération des films tendances...';
    const response = await this.seederService.getTrendingMovies(this.apiPage);
    this.infoBox = 'Films récupérés.';
    const trendingMovies = response.data.results;
    await this.processMovies(trendingMovies);
    this.infoBox = 'Seeder terminé';
  }

  async processMovies(movies: any[]) {
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const creditsResponse = await this.seederService.getMovieCredits(movie.id);
      const director = creditsResponse.data.crew.find((member: any) => member.job === 'Director').name;
      const [firstname, lastname] = director.split(' ');
      const db_director: Director = {
        id: 0,
        firstname,
        lastname,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.infoBox = 'Ajout du réalisateur ' + director + '...';
      try {
        const response = await this.directorService.addDirector(db_director);
        const dbDirectorId = response.data.director.id;
        await this.addMovie(dbDirectorId, movie);
      } catch (error: any) {
        const dbDirectorId = error.response.data.director.id;
        await this.addMovie(dbDirectorId, movie);
      }
      this.progress = ((i + 1) / this.totalMovies) * 100;
      console.log(`${i + 1}/${this.totalMovies} (${this.progress}%)`);
    }
  }

  async addMovie(dbDirectorId: number, movie: any) {
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
    await this.movieService.addMovie(dbMovie);
    this.addedMovies++;
  }
}
