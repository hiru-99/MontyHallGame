import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  doors = [
    { revealed: false, prize: 'goat' },
    { revealed: false, prize: 'goat' },
    { revealed: false, prize: 'goat' }
  ];
  
  selectedDoor: number | null = null;
  gameOver = false;
  message = '';

  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.doors.forEach(d => { d.prize = 'goat'; d.revealed = false; });
    const carIndex = Math.floor(Math.random() * 3);
    this.doors[carIndex].prize = 'car';
    this.selectedDoor = null;
    this.gameOver = false;
    this.message = '';
  }

  onDoorSelected(index: number) {
    if (this.selectedDoor === null) {
      this.selectedDoor = index;
      this.revealGoat();
    }
  }

  revealGoat() {
    const goatIndex = this.doors.findIndex((d, i) => i !== this.selectedDoor && d.prize === 'goat');
    this.doors[goatIndex].revealed = true;
  }

  choose(finalChoice: 'switch' | 'stay') {
    if (this.selectedDoor === null) return;

    let finalDoor = this.selectedDoor;

    if (finalChoice === 'switch') {
      finalDoor = this.doors.findIndex((_, i) => i !== this.selectedDoor && !this.doors[i].revealed);
    }

    this.doors.forEach(d => d.revealed = true);
    this.gameOver = true;

    if (this.doors[finalDoor].prize === 'car') {
      this.message = "🎉 You won the Car!";
    } else {
      this.message = "😢 You got a Goat!";
    }
  }
}
