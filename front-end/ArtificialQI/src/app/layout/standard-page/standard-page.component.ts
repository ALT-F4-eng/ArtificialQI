import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standard-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    FooterComponent,
    LoadingComponent,
    CommonModule
  ],
  templateUrl: './standard-page.component.html',
  styleUrls: ['./standard-page.component.css']
})
export class StandardPageComponent {
  isLoading = false;
}
