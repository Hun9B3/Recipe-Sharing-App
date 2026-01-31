import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../recipe.service';
import { SidebarComponent } from './sidebar.component';

@Component({
    selector: 'app-recipe-table',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    template: `
    <div class="flex min-h-screen bg-white">
      <app-sidebar></app-sidebar>
      
      <main class="flex-1 p-6">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">{{ title }}</h2>
          <p class="text-gray-600 mb-4">{{ description }}</p>
          
          <div class="overflow-x-auto" *ngIf="displayMode === 'table'">
            <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead [class]="headerClass">
                <tr>
                  <th class="px-4 py-3 text-left">Recipe Name</th>
                  <th class="px-4 py-3 text-left">Chef</th>
                  <th class="px-4 py-3 text-left" *ngIf="showIngredients">Ingredients</th>
                  <th class="px-4 py-3 text-center" *ngIf="showIngredientCount">Ingredient Count</th>
                  <th class="px-4 py-3 text-left" *ngIf="showMediaLink">Media Link</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let recipe of recipes" class="border-b hover:bg-gray-50">
                  <td class="px-4 py-3 font-semibold">{{ recipe.title }}</td>
                  <td class="px-4 py-3">{{ recipe.user?.firstName }} {{ recipe.user?.lastName }}</td>
                  <td class="px-4 py-3" *ngIf="showIngredients">
                    <ul class="text-sm">
                      <li *ngFor="let ing of recipe.ingredients">
                        {{ ing.amount }} {{ ing.ingredient.name }}
                      </li>
                    </ul>
                  </td>
                  <td class="px-4 py-3 text-center" *ngIf="showIngredientCount">
                    {{ recipe.ingredients?.length || 0 }}
                  </td>
                  <td class="px-4 py-3" *ngIf="showMediaLink">
                    <a [href]="recipe.imageUrl" target="_blank" class="text-blue-600 hover:underline">
                      View Image
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" *ngIf="displayMode === 'grid'">
            <div *ngFor="let recipe of recipes" class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
              <h3 class="font-bold text-lg mb-2">{{ recipe.title }}</h3>
              <p class="text-gray-600 mb-2">by {{ recipe.user?.firstName }} {{ recipe.user?.lastName }}</p>
              <p class="text-sm text-gray-500">{{ recipe.cuisine }} • {{ recipe.dietary }}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class RecipeTableComponent {
    @Input() title: string = 'Recipes';
    @Input() description: string = '';
    @Input() recipes: Recipe[] = [];
    @Input() headerClass: string = 'bg-blue-600 text-white';
    @Input() displayMode: 'table' | 'grid' = 'table';
    @Input() showIngredients: boolean = false;
    @Input() showIngredientCount: boolean = false;
    @Input() showMediaLink: boolean = false;
}
