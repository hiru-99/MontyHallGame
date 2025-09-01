import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GameService } from 'src/app/service/game.service';
import { SimulationResult } from 'src/app/model/simulation-result';

Chart.register(...registerables);

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

  @Input() numberOfSimulations = 1000; 
  @Input() switchDoorSimulation = true;

  simulationResult: SimulationResult | null = null;
  chart: any;

  constructor(private service: GameService) {}

  ngOnInit(): void {}

  startSimulation() {
    this.service.simulateGames(this.numberOfSimulations, this.switchDoorSimulation)
      .subscribe({
        next: res => {
          this.simulationResult = res;
          setTimeout(() => this.renderChart(), 0); // ensure canvas exists
        },
        error: err => alert('Simulation error: ' + err.message)
      });
  }

  renderChart() {
    const ctx = document.getElementById('simulationChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Wins', 'Losses'],
        datasets: [{
          data: [this.simulationResult?.wins, this.simulationResult?.losses],
          backgroundColor: ['#4caf50', '#f44336'],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#ffffff' } },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw as number;
                const total = (this.simulationResult?.wins || 0) + (this.simulationResult?.losses || 0);
                const percentage = ((value / total) * 100).toFixed(2);
                return `${tooltipItem.label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
}
