import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id?: string;
  mode: boolean = false;
  modeMessage = "new"
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.id = id;
      this.mode = !!id;
      this.modeMessage = this.mode ? "edit" : "new"
    })
  }

}
