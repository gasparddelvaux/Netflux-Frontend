import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserWithMovie } from '../../../interfaces/userWithMovie.interface';
import { LoaderComponent } from '../../misc/loader/loader.component';
import { AdminBanModalComponent } from '../admin-ban-modal/admin-ban-modal.component';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [LoaderComponent, RouterModule, AdminBanModalComponent],
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

  banModal: UserWithMovie | undefined = undefined;

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

  updateUser(user: UserWithMovie) {
    this.userService
      .updateUser(user)
      .then((response) => {
        console.log(response);
        this.toastr.success('Utilisateur mis à jour');
        this.loadUsers();
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Erreur lors de la mise à jour de l\'utilisateur');
      });
  }

  confirmBanModal(user: UserWithMovie) {
    this.banOrUnbanUser(user);
    this.banModal = undefined;
  }

  banOrUnbanUser(user: UserWithMovie) {
    const userToSend = this.clone(user);
    if(userToSend.role == 'superadmin' || userToSend.role == 'admin') {
      this.toastr.error('Vous ne pouvez pas bannir un administrateur');
      return;
    }
    userToSend.banned = !userToSend.banned;
    this.updateUser(userToSend);
  }

  grantOrRevokeAdmin(user: UserWithMovie) {
    const userToSend = this.clone(user);
    this.userService.getInfo().then((response) => {
      console.log(response.data.user.role);
      if (response.data.user.role == 'superadmin') {
        if(user.role == 'admin') {
          userToSend.role = 'guest';
        }else{
          userToSend.role = 'admin';
        }
        this.updateUser(userToSend);
      } else {
        this.toastr.error('Vous n\'avez pas les droits pour effectuer cette action');
      }
    }).catch((error) => {
      console.log(error);
      this.toastr.error('Erreur lors de la récupération de vos informations');
    });
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }

  displayRole(role: string){
    switch(role){
      case 'superadmin':
        return 'Super Administrateur';
      case 'admin':
        return 'Administrateur';
      case 'guest':
        return 'Utilisateur';
      default:
        return 'Inconnu';
    }
  }

  private clone(value: any) {
    return JSON.parse(JSON.stringify(value));
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
