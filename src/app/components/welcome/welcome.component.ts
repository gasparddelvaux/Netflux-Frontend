import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  @Output() toggle = new EventEmitter<void>();

  toggleWelcome() {
    this.toggle.emit();
  }
}
