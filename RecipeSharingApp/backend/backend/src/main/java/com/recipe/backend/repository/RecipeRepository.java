package com.recipe.backend.repository;

import com.recipe.backend.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("SELECT r FROM Recipe r JOIN r.ingredients ri JOIN ri.ingredient i " +
           "WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :ingredientName, '%')) " +
           "AND (:cuisine IS NULL OR r.cuisine = :cuisine) " +
           "AND (:dietary IS NULL OR r.dietary = :dietary)")
    List<Recipe> findByIngredientAndFilters(
            @Param("ingredientName") String ingredientName,
            @Param("cuisine") String cuisine,
            @Param("dietary") String dietary);

    List<Recipe> findByCuisine(String cuisine);

    List<Recipe> findByDietary(String dietary);

  // Query 1: whatCanIMake
  // "Recipe details sorted by recipe name, then chef’s last name"
  @Query("SELECT r FROM Recipe r JOIN FETCH r.user u ORDER BY r.title ASC, u.lastName ASC")
  List<Recipe> findAllSortedByNameAndChef();

  // Query 2: sendNoods
  // "Recipes with noodles as an ingredient"
  @Query("SELECT DISTINCT r FROM Recipe r JOIN r.ingredients ri JOIN ri.ingredient i WHERE LOWER(i.name) LIKE %:ingredientName%")
  List<Recipe> findRecipesByIngredientName(@Param("ingredientName") String ingredientName);

  // Query 3: theAlbannaBrothers
  // "Recipes by chefs with Albanna as the last name"
  @Query("SELECT r FROM Recipe r JOIN r.user u WHERE LOWER(u.lastName) = LOWER(:lastName)")
  List<Recipe> findRecipesByChefLastName(@Param("lastName") String lastName);

  // Query 4: numberOfIngredients
  // "Recipes by chefs without Alison as the first name" (Cần thêm logic đếm ở Service hoặc DTO, nhưng đây là query lấy data)
  @Query("SELECT r FROM Recipe r JOIN r.user u WHERE LOWER(u.firstName) <> LOWER(:firstName)")
  List<Recipe> findRecipesByChefFirstNameNot(@Param("firstName") String firstName);

  // Query 5: soups_from_foodnetwork
  // "Recipes from foodnetwork with soup as a tag"
  // Giả sử "Food Network" là username hoặc first/last name. Ở đây ví dụ check username.
  @Query("SELECT DISTINCT r FROM Recipe r " +
    "JOIN r.user u " +
    "JOIN r.tags t " +
    "WHERE u.username = 'Food Network' " +
    "AND LOWER(t.name) = 'soup'")
  List<Recipe> findRecipesBySourceAndTag();
}
