import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameResult } from '../model/game-result';
import { SimulationResult } from '../model/simulation-result';

@Injectable({ providedIn: 'root' })
export class GameService {
  private apiUrl = 'http://localhost:5278/api/MontyHall';

  constructor(private http: HttpClient) {}

  playGame(selectedDoor: number, didSwitch: boolean): Observable<GameResult> {
    return this.http.post<GameResult>(
      `${this.apiUrl}/play?selectedDoor=${selectedDoor}&didSwitch=${didSwitch}`, {}
    );
  }

  simulateGames(numberOfGames: number, didSwitch: boolean): Observable<SimulationResult> {
    return this.http.post<SimulationResult>(
      `${this.apiUrl}/simulate?numberOfGames=${numberOfGames}&didSwitch=${didSwitch}`, {}
    );
  }
}


