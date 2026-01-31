import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../recipe.service';
import { RecipeTableComponent } from '../shared/recipe-table.component';

@Component({
    selector: 'app-query-albanna-brothers',
    standalone: true,
    imports: [RecipeTableComponent],
    template: `
    <app-recipe-table
      title="The Albanna Brothers"
      description="Recipes by chefs with Albanna as the last name"
      [recipes]="recipes"
      displayMode="grid">
    </app-recipe-table>
  `
})
export class QueryAlbannaBrothersComponent implements OnInit {
    recipes: Recipe[] = [];

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
        this.recipeService.theAlbannaBrothers().subscribe(data => this.recipes = data);
    }
}
