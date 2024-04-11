import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserWithMovie } from '../../../interfaces/userWithMovie.interface';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css',
})
export class AdminUserListComponent {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Variables
  users: UserWithMovie[] = [];
  loading: boolean = false;

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  fromTo: string = '';
  searchQuery: string = '';

  loadUsers() {
    this.loading = true;
    this.userService
      .getUsers(this.currentPage, this.itemsPerPage, this.searchQuery)
      .then((response) => {
        this.users = response.data.data;
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

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }

  ngOnInit() {
    this.loadUsers();
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
    this.loadUsers();
  }

  onPageChange(action: string) {
    if (action == 'start') {
      if (this.currentPage != 1) {
        this.currentPage = 1;
        this.loadUsers();
      }
    } else if (action == 'previous') {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadUsers();
      }
    } else if (action == 'next') {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadUsers();
      }
    } else if (action == 'end') {
      if (this.currentPage != this.totalPages) {
        this.currentPage = this.totalPages;
        this.loadUsers();
      }
    }
  }

  // Recherche

  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.loadUsers();
  }
}
