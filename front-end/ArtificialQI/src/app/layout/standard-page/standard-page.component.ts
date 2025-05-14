import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MessageComponent } from '../../core/components/message/message.component';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-standard-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    FooterComponent,
    LoadingComponent,
    CommonModule,
    MessageComponent
],
  templateUrl: './standard-page.component.html',
  styleUrls: ['./standard-page.component.css']
})
export class StandardPageComponent {
  isLoading = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading = false;
      }
    });
  }
}