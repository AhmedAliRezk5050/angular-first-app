import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent implements OnInit {
  userData?: data.UserData;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.userData = data['userData']
    })
  }

  moveTo(e: Event) {
    e.preventDefault();
    this.router.navigate(['/third-component'], { relativeTo: this.route });
  }
}
