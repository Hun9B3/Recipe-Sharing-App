import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../recipe.service';
import { RecipeTableComponent } from '../shared/recipe-table.component';

@Component({
  selector: 'app-query-send-noods',
  standalone: true,
  imports: [RecipeTableComponent],
  template: `
    <app-recipe-table
      title="Send Noods! 🍜"
      description="Recipes with noodles as an ingredient"
      [recipes]="recipes"
      headerClass="bg-yellow-600 text-white"
      [showIngredients]="true">
    </app-recipe-table>
  `
})
export class QuerySendNoodsComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.sendNoods().subscribe(data => this.recipes = data);
  }
}
