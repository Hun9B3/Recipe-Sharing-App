import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../recipe.service';
import { RecipeTableComponent } from '../shared/recipe-table.component';

@Component({
  selector: 'app-query-what-can-i-make',
  standalone: true,
  imports: [RecipeTableComponent],
  template: `
    <app-recipe-table
      title="What Can I Make?"
      description="All recipes sorted by name, then chef's last name"
      [recipes]="recipes"
      headerClass="bg-blue-600 text-white"
      [showIngredients]="true">
    </app-recipe-table>
  `
})
export class QueryWhatCanIMakeComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.whatCanIMake().subscribe(data => this.recipes = data);
  }
}
