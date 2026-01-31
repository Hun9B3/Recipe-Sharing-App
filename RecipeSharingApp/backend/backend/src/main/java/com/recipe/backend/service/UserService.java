package com.recipe.backend.service;

import com.recipe.backend.entity.Recipe;
import com.recipe.backend.entity.User;
import com.recipe.backend.repository.RecipeRepository;
import com.recipe.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Transactional
    public void addFavorite(Long userId, Long recipeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        user.getFavorites().add(recipe);
        userRepository.save(user);
    }
    
    @Transactional
    public void removeFavorite(Long userId, Long recipeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        user.getFavorites().remove(recipe);
        userRepository.save(user);
    }

    public Set<Recipe> getFavorites(Long userId) {
         User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
         return user.getFavorites();
    }
}
