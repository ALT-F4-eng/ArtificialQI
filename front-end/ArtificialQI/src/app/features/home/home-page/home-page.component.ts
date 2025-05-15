import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ContentComponent], 
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent{}

