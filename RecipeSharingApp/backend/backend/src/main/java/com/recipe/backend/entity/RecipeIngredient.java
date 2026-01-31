package com.recipe.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recipe_ingredients")
@Data
@NoArgsConstructor
public class RecipeIngredient {

  @EmbeddedId
  private RecipeIngredientId id = new RecipeIngredientId();

  @ManyToOne
  @MapsId("recipeId") // Ánh xạ vào field recipeId trong khóa chính
  @JoinColumn(name = "recipe_id")
  @JsonIgnore // Ngắt vòng lặp vô tận khi chuyển sang JSON
  private Recipe recipe;

  @ManyToOne
  @MapsId("ingredientId") // Ánh xạ vào field ingredientId trong khóa chính
  @JoinColumn(name = "ingredient_id")
  private Ingredient ingredient;

  @Column(name = "amount")
  private String amount;

  // Constructor tiện lợi để thêm nhanh
  public RecipeIngredient(Recipe recipe, Ingredient ingredient, String amount) {
    this.recipe = recipe;
    this.ingredient = ingredient;
    this.amount = amount;
    this.id = new RecipeIngredientId(recipe.getId(), ingredient.getId());
  }
}
