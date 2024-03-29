import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie.interface'
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (response) => {
        this.movies = Object.values(response)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  showAddForm = false;
  selectedMovie?: Movie;

  closeForm() {
    this.showAddForm = false;
    this.selectedMovie = undefined;
  }

  addMovie(film: Movie) {
    this.movieService.addMovie(film).subscribe({
      next: (response) => {
        if(response.type == 'success') {
          this.loadMovies();
          console.log('Film créé avec succès!');
          this.toastr.success('Magnifique !', 'Le film a bien été ajouté.');
        }else{
          this.toastr.error('Oups !', 'Le film n\'a pas pu être ajouté.');
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Oups !', 'Le film n\'a pas pu être ajouté.');
      }
  });
    this.showAddForm = false;
  }

  editMovie(film: Movie) {
    this.movieService.updateMovie(film.id, film).subscribe({
      next: (response) => {
        if(response.type == 'success') {
          this.loadMovies();
          console.log('Film mis à jour avec succès!');
          this.toastr.success('Magnifique !', 'Le film a bien été mis à jour.');
        }else{
          this.toastr.error('Oups !', 'Le film n\'a pas pu être mis à jour.');
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Oups !', 'Le film n\'a pas pu être mis à jour.');
      }
    });
    this.selectedMovie = undefined;
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  deleteMovie(movie: Movie) {
    this.movieService.deleteMovie(movie.id).subscribe({
      next: (response) => {
        if(response.type == 'success') {
          this.loadMovies();
          console.log('Film supprimé avec succès!');
          this.toastr.success('Magnifique !', 'Le film a bien été supprimé.');
        }else{
          this.toastr.error('Oups !', 'Le film n\'a pas pu être supprimé.');
        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Oups !', 'Le film n\'a pas pu être supprimé.');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.success('Déconnexion', 'Vous avez été déconnecté.');
    this.router.navigate(['/login']);
  }
}
