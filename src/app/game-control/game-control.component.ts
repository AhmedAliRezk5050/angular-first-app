import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit {
  counter: number = 0;

  id?: any;

  @Output() incremented = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  start() {
    this.id = setInterval(() => {
      this.counter++;
      this.incremented.emit(this.counter);
    }, 1000);
  }

  stop() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
