import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  oddArray: number[] = [];

  evenArray: number[] = [];

  counterIncremented(value: number) {
    if (value % 2 === 0) {
      this.evenArray.push(value);
    } else {
      this.oddArray.push(value);
    }
  }
}
