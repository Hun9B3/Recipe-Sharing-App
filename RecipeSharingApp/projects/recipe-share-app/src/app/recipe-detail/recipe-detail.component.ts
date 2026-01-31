import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService, Recipe } from '../recipe.service';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    imports: [CommonModule, SidebarComponent],
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe | null = null;
    isFavorite = false;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.recipeService.getRecipeById(+id).subscribe(data => {
                this.recipe = data;
            });
        }
    }

    toggleFavorite() {
        if (this.recipe) {
            this.isFavorite = !this.isFavorite;
            // In a real app, getting current userId from auth service
            const userId = 1;
            this.recipeService.addFavorite(userId, this.recipe.id).subscribe();
        }
    }

    parseSteps(instructions: string): string[] {
        if (!instructions) return [];
        return instructions.split('\n').filter(step => step.trim().length > 0);
    }
}
