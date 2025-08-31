import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-doors',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent {
  @Input() index!: number;   // door number
  @Input() revealed: boolean = false; 
  @Input() prize: string = ''; // 'car' or 'goat'
  @Output() doorSelected = new EventEmitter<number>();

  selectDoor() {
    this.doorSelected.emit(this.index);
  }
}
