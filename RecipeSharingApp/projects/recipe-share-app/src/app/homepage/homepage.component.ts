import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RecipeService, Recipe } from '../recipe.service';
import { SidebarComponent } from '../shared/sidebar.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="flex min-h-screen bg-white">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col">
        <!-- Header -->
        <header class="flex items-center justify-end gap-3 p-4 border-b border-gray-100">
          @if (authService.isAuthenticated()) {
            <div class="flex items-center gap-3">
              <span class="text-gray-700">Xin chào, {{ authService.currentUser()?.firstName }}!</span>
              <button (click)="authService.logout()" class="px-5 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Đăng xuất
              </button>
            </div>
          } @else {
            <button (click)="navigateToLogin()" class="px-5 py-2.5 text-gray-700 font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Đăng nhập
            </button>
          }
          <button class="flex items-center gap-2 px-5 py-2.5 text-orange-500 font-medium border border-orange-500 rounded-full hover:bg-orange-50 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Viết món mới
          </button>
        </header>

        <!-- Content -->
        <div class="flex-1 overflow-auto">
          <div class="max-w-5xl mx-auto px-6 py-8">
            <!-- Logo -->
            <div class="flex items-center justify-center gap-3 mb-8">
              <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <span class="text-white text-3xl font-bold">R</span>
              </div>
              <span class="text-4xl font-bold text-gray-800">Recipe Share</span>
            </div>

            <!-- Search Bar -->
            <div class="flex items-center gap-3 max-w-2xl mx-auto mb-10">
              <div class="flex-1 relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  [value]="searchQuery()"
                  (input)="searchQuery.set($any($event.target).value)"
                  (keyup.enter)="onSearch()"
                  placeholder="Tìm tên món hay nguyên liệu"
                  class="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>
              <button (click)="onSearch()" class="px-8 py-3.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                Tìm Kiếm
              </button>
            </div>

            <!-- Trending Section -->
            <section class="mb-10">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-800">Món Ăn Phổ Biến</h2>
              </div>

              <div class="grid grid-cols-4 gap-4">
                <a *ngFor="let recipe of trendingRecipes" 
                   [routerLink]="['/recipe', recipe.id]"
                   class="group relative aspect-4/3 rounded-lg overflow-hidden">
                  <img
                    [src]="recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'"
                    [alt]="recipe.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <span class="absolute bottom-3 left-3 text-white font-medium">{{ recipe.title }}</span>
                </a>
              </div>
            </section>

            <!-- Latest Recipes -->
            <section>
              <div class="flex items-center gap-2 mb-4">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h2 class="text-xl font-bold text-gray-800">Món Ăn Mới Nhất</h2>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <a *ngFor="let recipe of latestRecipes" 
                   [routerLink]="['/recipe', recipe.id]"
                   class="group">
                  <div class="relative aspect-video rounded-lg overflow-hidden mb-2">
                    <img
                      [src]="recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop'"
                      [alt]="recipe.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      {{ recipe.cuisine }}
                    </div>
                  </div>
                  <h3 class="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">{{ recipe.title }}</h3>
                  <p class="text-sm text-gray-500 mt-1">by {{ recipe.user?.firstName }} {{ recipe.user?.lastName }}</p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  `
})
export class HomepageComponent implements OnInit {
  searchQuery = signal('');
  trendingRecipes: Recipe[] = [];
  latestRecipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    protected authService: AuthService
  ) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.trendingRecipes = recipes.slice(0, 8);
      this.latestRecipes = recipes.slice(8, 14);
    });
  }

  onSearch() {
    const query = this.searchQuery().trim();
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
