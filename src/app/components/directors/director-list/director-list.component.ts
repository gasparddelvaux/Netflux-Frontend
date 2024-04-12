import { Component } from '@angular/core';
import { LoaderComponent } from '../../misc/loader/loader.component';
import { DirectorFormComponent } from '../director-form/director-form.component';
import { DirectorService } from '../../../services/director/director.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Director } from '../../../interfaces/director.interface';

@Component({
  selector: 'app-director-list',
  standalone: true,
  imports: [LoaderComponent, DirectorFormComponent],
  templateUrl: './director-list.component.html',
  styleUrl: './director-list.component.css',
})
export class DirectorListComponent {
  constructor(
    private directorService: DirectorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Variables
  directors: Director[] = [];
  showAddForm = false;
  loading: boolean = false;

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  fromTo: string = '';
  searchQuery: string = '';

  // Fonctions API

  loadDirectors() {
    this.loading = true;
    this.directorService
      .getDirectors(this.currentPage, this.itemsPerPage, this.searchQuery)
      .then((response) => {
        this.directors = response.data.data;
        console.log(response.data);
        this.totalItems = response.data.total;
        this.totalPages = response.data.last_page;
        this.currentPage = response.data.current_page;
        if (response.data.from == null || response.data.to == null) {
          this.fromTo = '0-0';
        } else {
          this.fromTo = `${response.data.from}-${response.data.to}`;
        }
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  addDirector(director: Director) {
    this.directorService
      .addDirector(director)
      .then((response) => {
        if (response.data.type == 'success') {
          this.loadDirectors();
          console.log('Réalisateur ajouté avec succès!');
          this.toastr.success(
            'Magnifique !',
            'Le réalisateur a bien été ajouté.'
          );
        } else {
          this.toastr.error('Oups !', "Le réalisateur n'a pas pu être ajouté.");
        }
      })
      .catch((error) => {
        if(error.response.status == 400) {
          this.toastr.error(error.response.data.message, "Oups !");
        }else{
          this.toastr.error("Le réalisateur n'a pas pu être ajouté.", "Oups !");
        }
        console.log(error);
      }),
      (this.showAddForm = false);
  }

  // Fonctions de gestion de l'affichage

  closeForm() {
    this.showAddForm = false;
  }

  truncate(text: string) {
    if (text.length > 50) {
      return text.substring(0, 50) + '...';
    } else {
      return text;
    }
  }

  // Chargement des réalisateurs

  ngOnInit() {
    this.loadDirectors();
    this.checkItemsPerPageLS();
  }

  // Pagination

  checkItemsPerPageLS() {
    const savedItemsPerPage = localStorage.getItem('itemsPerPage');
    if (savedItemsPerPage != null) {
      this.itemsPerPage = parseInt(savedItemsPerPage);
    }
  }

  onItemsPerPageChange(event: Event) {
    this.itemsPerPage = (event.target as HTMLSelectElement)
      .value as unknown as number;
    localStorage.setItem('itemsPerPage', this.itemsPerPage.toString());
    this.loadDirectors();
  }

  onPageChange(action: string) {
    if (action == 'start') {
      if (this.currentPage != 1) {
        this.currentPage = 1;
        this.loadDirectors();
      }
    } else if (action == 'previous') {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadDirectors();
      }
    } else if (action == 'next') {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadDirectors();
      }
    } else if (action == 'end') {
      if (this.currentPage != this.totalPages) {
        this.currentPage = this.totalPages;
        this.loadDirectors();
      }
    }
  }

  // Recherche

  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.loadDirectors();
  }
}
