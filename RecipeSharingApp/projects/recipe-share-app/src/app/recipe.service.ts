import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface Ingredient {
    id: number;
    name: string;
}

export interface RecipeIngredient {
    ingredient: Ingredient;
    amount: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Recipe {
    id: number;
    title: string;
    description: string;
    instructions: string;
    cuisine: string;
    dietary: string;
    imageUrl: string;
    user: User;
    ingredients: RecipeIngredient[];
    tags: Tag[];
}

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private apiUrl = 'http://localhost:8080/api/recipes';
    private userUrl = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient) { }

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.apiUrl);
    }

    getRecipeById(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
    }

    searchRecipes(ingredient?: string, cuisine?: string, dietary?: string): Observable<Recipe[]> {
        let params = new HttpParams();
        if (ingredient) params = params.set('ingredient', ingredient);
        if (cuisine) params = params.set('cuisine', cuisine);
        if (dietary) params = params.set('dietary', dietary);

        return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params });
    }

    addFavorite(userId: number, recipeId: number): Observable<void> {
        return this.http.post<void>(`${this.userUrl}/${userId}/favorites/${recipeId}`, {});
    }

    // Query 1: whatCanIMake
    whatCanIMake(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/queries/what-can-i-make`);
    }

    // Query 2: sendNoods
    sendNoods(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/queries/send-noods`);
    }

    // Query 3: theAlbannaBrothers
    theAlbannaBrothers(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/queries/albanna-brothers`);
    }

    // Query 4: numberOfIngredients
    numberOfIngredients(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/queries/not-alison`);
    }

    // Query 5: soupsFromFoodNetwork
    soupsFromFoodNetwork(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/queries/foodnetwork-soups`);
    }
}
