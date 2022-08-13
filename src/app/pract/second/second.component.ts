import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {ICanDeactivateComponent} from "../can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
})
export class SecondComponent implements OnInit, ICanDeactivateComponent {
  name?: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.name = params['name']));
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return confirm("Discard changes and leave?");
  }
}
