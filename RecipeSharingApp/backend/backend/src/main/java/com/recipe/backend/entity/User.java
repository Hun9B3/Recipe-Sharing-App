package com.recipe.backend.entity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "password_hash")
  private String passwordHash;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "provider")
  private String provider; // "local", "google", "facebook"

  @Column(name = "provider_id")
  private String providerId;

  @Column(name = "profile_picture_url")
  private String profilePictureUrl;

  @Column(name = "email_verified")
  private Boolean emailVerified = false;

  @Column(name = "verification_token")
  private String verificationToken;

  @Column(name = "verification_token_expiry")
  private LocalDateTime verificationTokenExpiry;

  @ManyToOne
  @JoinColumn(name = "role_id")
  private Role role;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @ManyToMany
  @JoinTable(
      name = "favorites",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "recipe_id")
  )
  private java.util.Set<Recipe> favorites = new java.util.HashSet<>();
}
