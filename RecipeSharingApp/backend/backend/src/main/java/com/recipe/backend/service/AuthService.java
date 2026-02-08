package com.recipe.backend.service;

import com.recipe.backend.config.JwtUtil;
import com.recipe.backend.dto.AuthResponse;
import com.recipe.backend.dto.LoginRequest;
import com.recipe.backend.dto.RegisterRequest;
import com.recipe.backend.entity.User;
import com.recipe.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setProvider("local");
        user.setEmailVerified(false);

        // Generate verification token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusHours(24));

        User savedUser = userRepository.save(user);

        // Send verification email
        try {
            emailService.sendVerificationEmail(
                savedUser.getEmail(),
                savedUser.getFirstName(),
                verificationToken
            );
        } catch (Exception e) {
            // Log error but don't fail registration
            System.err.println("Failed to send verification email: " + e.getMessage());
        }

        // Generate token
        String token = jwtUtil.generateToken(
                savedUser.getEmail(),
                savedUser.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName()
        );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getUsername()
        );
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Verify password (only for local users)
        if ("local".equals(user.getProvider())) {
            if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                throw new RuntimeException("Invalid email or password");
            }
        } else {
            throw new RuntimeException("Please use " + user.getProvider() + " to login");
        }

        // Check if email is verified (only for local users)
        if ("local".equals(user.getProvider()) && !Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new RuntimeException("Please verify your email before logging in");
        }

        // Generate token
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getId(),
                user.getFirstName(),
                user.getLastName()
        );

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername()
        );
    }

    public User findOrCreateOAuthUser(String provider, String providerId, String email, 
                                      String firstName, String lastName, String profilePictureUrl) {
        // Try to find existing user by provider
        Optional<User> existingUser = userRepository.findByProviderAndProviderId(provider, providerId);
        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // Try to find by email (user might have registered with email first)
        Optional<User> userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isPresent()) {
            User user = userByEmail.get();
            // Update OAuth info
            user.setProvider(provider);
            user.setProviderId(providerId);
            if (profilePictureUrl != null) {
                user.setProfilePictureUrl(profilePictureUrl);
            }
            return userRepository.save(user);
        }

        // Create new user
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setProvider(provider);
        newUser.setProviderId(providerId);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setProfilePictureUrl(profilePictureUrl);
        newUser.setUsername(email.split("@")[0] + "_" + provider);
        newUser.setEmailVerified(true); // OAuth users are pre-verified

        return userRepository.save(newUser);
    }

    public AuthResponse createAuthResponse(User user) {
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getId(),
                user.getFirstName(),
                user.getLastName()
        );

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername()
        );
    }

    public void verifyEmail(String token) {
        User user = userRepository.findAll().stream()
                .filter(u -> token.equals(u.getVerificationToken()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));

        // Check if token is expired
        if (user.getVerificationTokenExpiry() == null || 
            LocalDateTime.now().isAfter(user.getVerificationTokenExpiry())) {
            throw new RuntimeException("Verification token has expired");
        }

        // Mark email as verified
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);
        userRepository.save(user);
    }

    public void resendVerificationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new RuntimeException("Email is already verified");
        }

        // Generate new token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        // Send email
        try {
            emailService.sendVerificationEmail(
                user.getEmail(),
                user.getFirstName(),
                verificationToken
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email");
        }
    }
}
