import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserWithMovie } from '../../../interfaces/userWithMovie.interface';

@Component({
  selector: 'app-admin-ban-modal',
  standalone: true,
  imports: [],
  templateUrl: './admin-ban-modal.component.html',
  styleUrl: './admin-ban-modal.component.css'
})
export class AdminBanModalComponent {
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Input() user: UserWithMovie | undefined = undefined;

  handleConfirm() {
    this.confirm.emit(this.user);
  }

  handleCancel() {
    this.cancel.emit();
  }
}
