import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private confirmSubject = new BehaviorSubject<{ message: string, onConfirm: () => void, onCancel?: () => void } | null>(null);
  confirm$ = this.confirmSubject.asObservable();

  showConfirm(message: string, onConfirm: () => void, onCancel?: () => void) {
    this.confirmSubject.next({ message, onConfirm, onCancel });
  }

  clear() {
    this.confirmSubject.next(null);
  }
}