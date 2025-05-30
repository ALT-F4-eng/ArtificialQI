import { Component, EventEmitter, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  Chart,
  registerables,
} from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import zoomPlugin from 'chartjs-plugin-zoom';

// Registra Chart.js e il plugin zoom
Chart.register(...registerables, zoomPlugin);

@Component({
  selector: 'app-scatter-diagram',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './scatter-diagram.component.html',
  styleUrls: ['./scatter-diagram.component.css'],
})

export class ScatterDiagramComponent implements OnDestroy {
  @Input() elementValuesOrigin: { x: number; y: number }[] = [];
  @Input() elementValuesCompare: { x: number; y: number }[] = [];
  @Output() pointClicked = new EventEmitter<number>();
  @Input() enableZoom = true;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  scatterChartType: ChartType = 'scatter';
  
  get scatterChartData(): ChartData<'scatter'> {
    const datasets = [
      {
        label: 'Similarità per domanda (Origin)',
        data: this.elementValuesOrigin,
        backgroundColor: 'blue',
        pointRadius: 5,
      },
    ];

    if (this.elementValuesCompare && this.elementValuesCompare.length > 0) {
      datasets.push({
        label: 'Similarità per domanda (Compare)',
        data: this.elementValuesCompare,
        backgroundColor: 'red',
        pointRadius: 5,
      });
    }

    return { datasets };
  }

  get scatterChartOptions(): ChartConfiguration<'scatter'>['options'] {
    const baseOptions = {
      responsive: true,
      interaction: {
        mode: 'nearest',
        axis: 'xy',
        intersect: true,
      },
      plugins: {
        legend: { display: true },
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: 'xy',
          },
          pan: {
            enabled: true,
            mode: 'xy',
          },
          limits: {
            x: { min: 0, max: 'original' },
            y: { min: 0, max: 1 },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Risultato n°' },
          ticks: { stepSize: 1 },
          min: 0,
          max: this.elementValuesOrigin.length + 1,
        },
        y: {
          title: { display: true, text: 'Similarità' },
          min: 0,
          max: 1.03,
        },
      },
      onClick: (event: ChartEvent, elements: any[]) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const xValue = this.elementValuesOrigin[index].x;
          this.pointClicked.emit(xValue);
        }
      },
    };

    if (this.enableZoom) {
      // Aggiungi il plugin zoom solo se enableZoom è true
      (baseOptions.plugins as any).zoom = {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'xy'
        },
        pan: {
          enabled: true,
          mode: 'xy'
        },
        limits: {
          x: { min: 0, max: 'original' },
          y: { min: 0, max: 1 }
        }
      };
    }

    return baseOptions;
  }

  ngOnDestroy(): void {
    // Se hai bisogno di pulire qualcosa qui, metti il codice
  }
}
