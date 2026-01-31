package com.recipe.backend.service;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(Long id) {
        return recipeRepository.findById(id);
    }

    public List<Recipe> searchRecipes(String ingredient, String cuisine, String dietary) {
        if (ingredient == null && cuisine == null && dietary == null) {
            return recipeRepository.findAll();
        }
        return recipeRepository.findByIngredientAndFilters(
            ingredient != null ? ingredient : "",
            cuisine,
            dietary
        );
    }

    // Query 1: whatCanIMake - All recipes sorted by name and chef
    public List<Recipe> whatCanIMake() {
        return recipeRepository.findAllSortedByNameAndChef();
    }

    // Query 2: sendNoods - Recipes with noodles
    public List<Recipe> sendNoods() {
        return recipeRepository.findRecipesByIngredientName("noodle");
    }

    // Query 3: theAlbannaBrothers - Recipes by Albanna last name
    public List<Recipe> theAlbannaBrothers() {
        return recipeRepository.findRecipesByChefLastName("Albanna");
    }

    // Query 4: numberOfIngredients - Recipes not by Alison
    public List<Recipe> numberOfIngredients() {
        return recipeRepository.findRecipesByChefFirstNameNot("Alison");
    }

    // Query 5: soups_from_foodnetwork - Food Network soup recipes
    public List<Recipe> soupsFromFoodNetwork() {
        return recipeRepository.findRecipesBySourceAndTag();
    }
}
