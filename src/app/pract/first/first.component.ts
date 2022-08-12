import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent implements OnInit {
  name?: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const x = params['name'];
      this.name = !!params['name'] ? params['name'] : 'default name';
    });
  }

  moveTo(e: Event) {
    e.preventDefault();
    this.router.navigate(['/third-component'], { relativeTo: this.route });
  }
}
