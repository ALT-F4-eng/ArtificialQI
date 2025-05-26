import { Component, OnInit, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { TestService } from '../../../core/services/test.service';

import { TestDto } from '../../../core/models/test-dto.model';
import { TestPageDto } from '../../../core/models/testpage-dto.model';
import { TestResultDto } from '../../../core/models/testresult-dto.model';

import { CakeDiagramComponent } from '../cake-diagram/cake-diagram.component';
import { BarDiagramComponent } from '../bar-diagram/bar-diagram.component';

@Component({
  selector: 'app-comparison-index',
  imports: [RouterModule, CakeDiagramComponent, BarDiagramComponent],
  templateUrl: './comparison-index.component.html',
  styleUrl: './comparison-index.component.css',
})
export class ComparisonIndexComponent implements OnInit {
  @Input() test_Origin?: TestDto;
  @Input() test_Compared?: TestDto;

  @Input() resultsOrigin_ComparisonIndex: TestResultDto[] = [];
  @Input() resultsCompared_ComparisonIndex: TestResultDto[] = [];

  ngOnInit() {}
  // si puo migliorare come funzione distributionFunction 
  get correctnessValue(): number {
    if (!this.resultsOrigin_ComparisonIndex?.length) return 0;
    const correct = this.resultsOrigin_ComparisonIndex.filter(
      (r) => r.correct
    ).length;
    return Math.round(
      (correct / this.resultsOrigin_ComparisonIndex.length) * 100
    );
  }

  //proprietà compared
  get correctnessValueCompared(): number {
    if (!this.resultsCompared_ComparisonIndex?.length) return 0;
    const correct = this.resultsCompared_ComparisonIndex.filter(
      (r) => r.correct
    ).length;
    return Math.round(
      (correct / this.resultsCompared_ComparisonIndex.length) * 100
    );
  }

   distributionFunction(results:TestResultDto[]): number[] {
    const bins = [0, 0, 0, 0, 0];
    results.forEach((r) => {
      const sim = r.similarity ?? 0;
      if (sim < 0.2) bins[0]++;
      else if (sim < 0.4) bins[1]++;
      else if (sim < 0.6) bins[2]++;
      else if (sim < 0.8) bins[3]++;
      else bins[4]++;
    });
    return bins;
  }

}
