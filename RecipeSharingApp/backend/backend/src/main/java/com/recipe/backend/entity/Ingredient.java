package com.recipe.backend.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ingredients")
@Data
public class Ingredient {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String name;
}
