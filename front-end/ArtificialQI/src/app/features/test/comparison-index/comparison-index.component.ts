import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { TestService } from '../../../core/services/test.service';

import { TestDto } from '../../../core/models/test-dto.model';
import { TestPageDto } from '../../../core/models/testpage-dto.model';

@Component({
  selector: 'app-comparison-index',
  imports: [RouterModule],
  templateUrl: './comparison-index.component.html',
  styleUrl: './comparison-index.component.css',
})
export class ComparisonIndexComponent implements OnInit {
  test_Origin?: TestDto;
  test_Compared?: TestDto;
  MOCK_TEST_PAGE_Origin: TestPageDto[] = [];
  MOCK_TEST_PAGE_Compared: TestPageDto[] = [];

  constructor(private testService: TestService, private route: ActivatedRoute) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const testid = idParam ? +idParam : 1;
    /*
    this.testService.getTest(testid).subscribe({
      next: (testData) => {
        this.test = testData;
        this.loadResults();
      },
      error: () => {
        //this.errorMessage = 'Errore nel caricamento del test.';
      },
    });*/
  }
}
