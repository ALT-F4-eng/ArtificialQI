import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSubject = new BehaviorSubject<{ message: string, type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  message$ = this.messageSubject.asObservable();

  showMessage(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
  this.messageSubject.next({ message, type });

  setTimeout(() => this.clear(), 3000);
}


  clear() {
    this.messageSubject.next(null);
  }
}
