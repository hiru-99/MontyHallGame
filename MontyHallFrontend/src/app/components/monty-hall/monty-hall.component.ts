import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GameService } from 'src/app/service/game.service';
import { GameResult } from 'src/app/model/game-result';

// Register all Chart.js components (required for creating charts)
Chart.register(...registerables);

@Component({
  selector: 'app-monty-hall',
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css']
})
export class MontyHallComponent implements OnInit {

  // Array representing 3 doors for the Monty Hall game
  doors = [1, 2, 3];

  // Holds the currently selected door by the player
  chosenDoor: number | null = null;

  // Toggle switches for game options
  switchDoorSingle = true;        

  // Holds the result of a single game
  gameResult: GameResult | null = null;

  constructor(private service: GameService) {}

  ngOnInit(): void {
    
  }

  /**
   * Plays a single Monty Hall game.
   * @param door 
   */
  playGame(door: number) {
    this.chosenDoor = door; 

    // Call the backend service to play a single game
    this.service.playGame(door, this.switchDoorSingle).subscribe({
      next: (res: GameResult) => this.gameResult = res, 
      error: (err: any) => alert('Error: ' + err.message) 
    });
  }
 
}
