import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  imports: [NgClass, NgIf]
})
export class MessageComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' | 'warning' | 'info' = 'info';

  constructor(private messageService: MessageService) {
}
  ngOnInit() {
    this.messageService.message$.subscribe((data) => {
      if (data) {
        this.message = data.message;
        if (['success', 'error', 'warning', 'info'].includes(data.type)) {
          this.type = data.type as 'success' | 'error' | 'warning' | 'info';
        } else {
          console.warn('Invalid message type:', data.type);
        }
      } else {
        this.message = '';
      }
    });
  }
}
