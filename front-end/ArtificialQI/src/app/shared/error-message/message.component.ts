import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message-box',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageBoxComponent {
  @Input() message: string = '';
  @Input() type!: 'success' | 'error';

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      default: return 'error';
    }
  }
}