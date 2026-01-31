import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService, Recipe } from '../recipe.service';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
    selector: 'app-recipe-search',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
    template: `
    <div class="flex min-h-screen bg-white">
      <app-sidebar></app-sidebar>
      
      <main class="flex-1 p-6">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl font-bold mb-4">Find Recipes</h2>
          <div class="flex gap-4 mb-6">
            <input [(ngModel)]="ingredient" placeholder="Ingredient" class="border p-2 rounded grow">
            <select [(ngModel)]="cuisine" class="border p-2 rounded">
              <option value="">All Cuisines</option>
              <option value="Italian">Italian</option>
              <option value="Asian">Asian</option>
            </select>
            <select [(ngModel)]="dietary" class="border p-2 rounded">
              <option value="">All Diets</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
            <button (click)="search()" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Search</button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div *ngFor="let recipe of recipes" class="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              <img [src]="recipe.imageUrl" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="font-bold text-lg">{{ recipe.title }}</h3>
                <p class="text-gray-600">{{ recipe.cuisine }} • {{ recipe.dietary }}</p>
                <a [routerLink]="['/recipe', recipe.id]" class="block mt-2 text-orange-500 hover:underline">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class RecipeSearchComponent {
    ingredient = '';
    cuisine = '';
    dietary = '';
    recipes: Recipe[] = [];

    constructor(private recipeService: RecipeService) { }

    search() {
        this.recipeService.searchRecipes(
            this.ingredient || undefined,
            this.cuisine || undefined,
            this.dietary || undefined
        ).subscribe(data => this.recipes = data);
    }
}
