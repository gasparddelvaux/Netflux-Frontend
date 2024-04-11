import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';
import { Movie } from '../../../interfaces/movie.interface'
import { MovieFormComponent } from '../movie-form/movie-form.component';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { LoaderComponent } from '../../misc/loader/loader.component';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieFormComponent, RouterLink, RouterLinkActive, MovieDetailsComponent, LoaderComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {

  constructor(private movieService: MovieService, private toastr: ToastrService, private router: Router) {}

  // Variables
  movies: Movie[] = [];
  showAddForm = false;
  selectedMovie?: Movie;
  selectedMovieDetails?: Movie;
  loading: boolean = false;

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  fromTo: string = '';
  searchQuery: string = '';

  // Fonctions API

  loadMovies() {
    this.loading = true;
    this.movieService.getMovies(this.currentPage, this.itemsPerPage, this.searchQuery)
      .then(response => {
        this.movies = response.data.data;
        this.totalItems = response.data.total;
        this.totalPages = response.data.last_page;
        this.currentPage = response.data.current_page;
        console.log(this.itemsPerPage);
        if(response.data.from == null || response.data.to == null) {
          this.fromTo = '0-0';
        }else{
          this.fromTo = `${response.data.from}-${response.data.to}`;
        }
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
  }

  addMovie(movie: Movie) {
    this.movieService.addMovie(movie).subscribe({
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

  editMovie(movie: Movie) {
    this.movieService.updateMovie(movie.id, movie).subscribe({
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

  // Fonctions de gestion de l'affichage

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  closeForm() {
    this.showAddForm = false;
    this.selectedMovie = undefined;
  }

  closeDetails() {
    this.selectedMovieDetails = undefined;
  }

  truncate(text: string) {
    if(text.length > 50) {
      return text.substring(0, 50) + '...';
    } else {
      return text;
    }
  }

  // Chargement des films

  ngOnInit() {
    this.loadMovies();
    this.checkItemsPerPageLS();
  }

  // Pagination

  checkItemsPerPageLS() {
    const savedItemsPerPage = localStorage.getItem('itemsPerPage');
    if(savedItemsPerPage != null) {
      this.itemsPerPage = parseInt(savedItemsPerPage);
    }
  }

  onItemsPerPageChange(event: Event) {
    this.itemsPerPage = (event.target as HTMLSelectElement).value as unknown as number;
    localStorage.setItem('itemsPerPage', this.itemsPerPage.toString());
    this.loadMovies();
  }

  onPageChange(action: string) {
    if(action == 'start') {
      if(this.currentPage != 1) {
        this.currentPage = 1;
        this.loadMovies();
      }
    } else if(action == 'previous') {
      if(this.currentPage > 1) {
        this.currentPage--;
        this.loadMovies();
      }
    } else if(action == 'next') {
      if(this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadMovies();
      }
    } else if(action == 'end') {
      if(this.currentPage != this.totalPages) {
        this.currentPage = this.totalPages;
        this.loadMovies();
      }
    }
  }

  // Recherche

  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.loadMovies();
  }
}
