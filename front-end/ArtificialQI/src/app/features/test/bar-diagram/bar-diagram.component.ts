import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-diagram',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './bar-diagram.component.html',
  styleUrls: ['./bar-diagram.component.css']
})
export class BarDiagramComponent {
  @Input() distribution: number[] = [];
  @Input() comparedDistribution?: number[];

  isTestEnv = this.isTestEnvironment();

  get barChartData(): ChartConfiguration<'bar'>['data'] | null {
    if (this.isTestEnv) {
      return null;  // In test non passo dati, canvas non viene renderizzato
    }

    return {
      labels: ['0–0.2', '0.2–0.4', '0.4–0.6', '0.6–0.8', '0.8–1'],
      datasets: [
        {
          label: 'Risposte',
          data: this.distribution,
          backgroundColor: '#2196F3'
        },
        ...(this.comparedDistribution ? [{
          label: 'Confronto',
          data: this.comparedDistribution,
          backgroundColor: '#9C27B0'
        }] : [])
      ]
    };
  }

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    },
    scales: {
      x: { title: { display: true, text: 'Intervalli di Similarità' } },
      y: { beginAtZero: true, title: { display: true, text: 'Numero risposte' } }
    }
  };

  barChartType: ChartType = 'bar';

  private isTestEnvironment(): boolean {
    return typeof process !== 'undefined' && !!process.env['JEST_WORKER_ID'];
  }
}
