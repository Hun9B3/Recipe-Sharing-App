import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../recipe.service';
import { RecipeTableComponent } from '../shared/recipe-table.component';

@Component({
  selector: 'app-query-not-alison',
  standalone: true,
  imports: [RecipeTableComponent],
  template: `
    <app-recipe-table
      title="Not Alison"
      description="Recipes by chefs without 'Alison' as the first name"
      [recipes]="recipes"
      headerClass="bg-purple-600 text-white"
      [showIngredientCount]="true">
    </app-recipe-table>
  `
})
export class QueryNotAlisonComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.numberOfIngredients().subscribe(data => this.recipes = data);
  }
}
