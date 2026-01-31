package com.recipe.backend.controller;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<Set<Recipe>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getFavorites(userId));
    }

    @PostMapping("/{userId}/favorites/{recipeId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        userService.addFavorite(userId, recipeId);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{userId}/favorites/{recipeId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        userService.removeFavorite(userId, recipeId);
        return ResponseEntity.ok().build();
    }
}
