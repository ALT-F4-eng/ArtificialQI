import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LlmService} from './core/services/llm.service';
import { MockLlmService } from './test/llm-test/llm.service.mock';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(), // <-- aggiunto
    { provide: LlmService, useClass: MockLlmService }]
};
