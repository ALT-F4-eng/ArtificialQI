import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LlmListPageComponent } from './features/LLM/llm-list-page/llm-list-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LlmListPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArtificialQI';
}
