import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { TestDto } from '../../../core/models/test-dto.model';
import { TestService } from '../../../core/services/test.service';

@Component({
  selector: 'app-test-page',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {
  @Input () test?: TestDto;
  
  constructor(private testService: TestService) { }
  ngOnInit() {
    if (this.test) {
      this.testService.getTest(this.test.ID).subscribe((test: TestDto) => {
        this.test = test;
      });
    }
  }
}
