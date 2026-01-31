import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../recipe.service';
import { RecipeTableComponent } from '../shared/recipe-table.component';

@Component({
    selector: 'app-query-foodnetwork-soups',
    standalone: true,
    imports: [RecipeTableComponent],
    template: `
    <app-recipe-table
      title="Food Network Soups"
      description="Soup recipes from Food Network"
      [recipes]="recipes"
      headerClass="bg-green-600 text-white"
      [showMediaLink]="true">
    </app-recipe-table>
  `
})
export class QueryFoodNetworkSoupsComponent implements OnInit {
    recipes: Recipe[] = [];

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
        this.recipeService.soupsFromFoodNetwork().subscribe(data => this.recipes = data);
    }
}
