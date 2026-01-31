package com.recipe.backend.entity;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientId implements Serializable {
  private Long recipeId;
  private Long ingredientId;
}
