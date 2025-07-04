import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const process: {
  env: { [key: string]: string | undefined };
};


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}



  ngAfterViewInit(): void {
    if (this.isTestEnvironment()) {
      return;
    }
    
    const elements = this.el.nativeElement.querySelectorAll('.fade-in-on-scroll');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'visible');
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    elements.forEach((el: Element, index: number) => {
      (el as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  }

  private isTestEnvironment(): boolean {
  return typeof process !== 'undefined' &&
         typeof process.env !== 'undefined' &&
         !!process.env['JEST_WORKER_ID'];
}
}