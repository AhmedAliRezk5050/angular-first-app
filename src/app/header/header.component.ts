import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() navItemSelected = new EventEmitter<header.SelectedNavItem>();

  constructor() {}

  ngOnInit(): void {}

  selectNavItem(event: Event, selected: header.SelectedNavItem) {
    event.preventDefault();
    this.navItemSelected.emit(selected);
  }
}
