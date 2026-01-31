import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-recipe-queries',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-white">
      <app-sidebar></app-sidebar>
      
      <main class="flex-1 p-6">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-4xl font-bold mb-8 text-gray-800">Recipe Queries</h1>
          <p class="text-gray-600 mb-8">Explore our curated recipe collections and specialized queries</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a routerLink="/queries/what-can-i-make" 
               class="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition border-l-4 border-blue-600">
              <h3 class="text-xl font-bold mb-2 text-gray-800">🍳 What Can I Make?</h3>
              <p class="text-gray-600 text-sm">Browse all recipes with chef names and ingredients</p>
            </a>
            
            <a routerLink="/queries/send-noods" 
               class="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition border-l-4 border-yellow-600">
              <h3 class="text-xl font-bold mb-2 text-gray-800">🍜 Send Noods!</h3>
              <p class="text-gray-600 text-sm">Find delicious noodle recipes</p>
            </a>
            
            <a routerLink="/queries/albanna-brothers" 
               class="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition border-l-4 border-red-600">
              <h3 class="text-xl font-bold mb-2 text-gray-800">👨‍🍳 Albanna Brothers</h3>
              <p class="text-gray-600 text-sm">Recipes from the Albanna family</p>
            </a>
            
            <a routerLink="/queries/not-alison" 
               class="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition border-l-4 border-purple-600">
              <h3 class="text-xl font-bold mb-2 text-gray-800">🚫 Not Alison</h3>
              <p class="text-gray-600 text-sm">Recipes from everyone except Alison</p>
            </a>
            
            <a routerLink="/queries/foodnetwork-soups" 
               class="block p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition border-l-4 border-green-600">
              <h3 class="text-xl font-bold mb-2 text-gray-800">🥣 Food Network Soups</h3>
              <p class="text-gray-600 text-sm">Soup recipes from Food Network</p>
            </a>
            
            <a routerLink="/search" 
               class="block p-6 bg-gray-100 shadow-md rounded-lg hover:shadow-xl transition border-l-4 border-gray-400">
              <h3 class="text-xl font-bold mb-2 text-gray-800">🔍 Search Recipes</h3>
              <p class="text-gray-600 text-sm">Browse all recipes or search by criteria</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  `
})
export class RecipeQueriesComponent { }
