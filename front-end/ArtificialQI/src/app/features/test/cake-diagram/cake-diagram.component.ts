import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-cake-diagram',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './cake-diagram.component.html',
  styleUrls: ['./cake-diagram.component.css']
})
export class CakeDiagramComponent {
  @Input() correctnessValue: number = 0;
  //@Input() comparedCorrectnessValue?: number;

  // Chart.js richiede valori da 0 a 100 (percentuale)
  get doughnutData(): ChartConfiguration<'doughnut'>['data'] {
    const correct = Math.round(this.correctnessValue);
    const incorrect = 100 - correct;

    return {
      labels: ['Corrette', 'Errate'],
      datasets: [{
        data: [correct, incorrect],
        backgroundColor: ['#4CAF50', '#F44336'],
      }]
    };
  }

  doughnutOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
}
