import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pract',
  templateUrl: './pract.component.html',
  styleUrls: ['./pract.component.css'],
})
export class PractComponent implements OnInit {
  message: string = 'ali';

  constructor() {}

  ngOnInit(): void {}
}
