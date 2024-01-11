import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FilmFormComponent } from './components/film-form/film-form.component';
import { FilmListComponent } from './components/film-list/film-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WelcomeComponent, FilmFormComponent, FilmListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Netflux';

  welcome = true;

  toggleWelcome() {
    this.welcome = !this.welcome;
  }
}
