import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css'],
})
export class ThirdComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((queryParams) =>
      console.log(queryParams['name']),
    );

    this.route.fragment.subscribe((fragment) => console.log(fragment));
  }

  ngOnInit(): void {}
}
