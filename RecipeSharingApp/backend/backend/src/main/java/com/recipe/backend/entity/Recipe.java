package com.recipe.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "recipes")
@Data
public class Recipe {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String instructions;

  private String cuisine;
  private String dietary;

  @Column(name = "image_url")
  private String imageUrl;

  @Column(name = "media_url")
  private String mediaUrl;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<RecipeIngredient> ingredients = new ArrayList<>();

  // --- MỚI THÊM: Spring Boot sẽ tự tạo bảng recipe_tags ---
  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
    name = "recipe_tags", // Tên bảng trung gian tự sinh
    joinColumns = @JoinColumn(name = "recipe_id"),
    inverseJoinColumns = @JoinColumn(name = "tag_id")
  )
  private Set<Tag> tags = new HashSet<>();

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;
}
