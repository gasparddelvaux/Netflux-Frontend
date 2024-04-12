import { Component } from '@angular/core';
import { Movie } from '../../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie/movie.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../misc/loader/loader.component';
import { MovieWithUser } from '../../../interfaces/movieWithUser';
import { MovieDetailsComponent } from '../../movies/movie-details/movie-details.component';

@Component({
  selector: 'app-admin-movie-list',
  standalone: true,
  imports: [LoaderComponent, MovieDetailsComponent],
  templateUrl: './admin-movie-list.component.html',
  styleUrl: './admin-movie-list.component.css'
})
export class AdminMovieListComponent {

  constructor(private movieService: MovieService, private toastr: ToastrService, private route: ActivatedRoute) {}

  // Variables
  movies: MovieWithUser[] = [];
  loading: boolean = false;
  userId: number | undefined = undefined;
  selectedMovieDetails?: Movie;

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  fromTo: string = '';
  searchQuery: string = '';

  // Fonctions API

  loadMovies() {
    this.loading = true;
    this.movieService.getMoviesAdmin(this.currentPage, this.itemsPerPage, this.searchQuery, this.userId)
      .then(response => {
        this.movies = response.data.data;
        this.totalItems = response.data.total;
        this.totalPages = response.data.last_page;
        this.currentPage = response.data.current_page;
        if(response.data.from == null || response.data.to == null) {
          this.fromTo = '0-0';
        }else{
          this.fromTo = `${response.data.from}-${response.data.to}`;
        }
        this.loading = false;
        console.log(this.movies);
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
      });
  }

  // Fonctions d'affichage

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
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if(userId != null) {
        this.userId = parseInt(userId);
        this.loadMovies();
      } else {
        this.userId = undefined;
        this.loadMovies();
      }
    });
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
