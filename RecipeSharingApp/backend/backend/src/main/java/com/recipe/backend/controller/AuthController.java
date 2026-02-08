package com.recipe.backend.controller;

import com.recipe.backend.dto.AuthResponse;
import com.recipe.backend.dto.LoginRequest;
import com.recipe.backend.dto.RegisterRequest;
import com.recipe.backend.entity.User;
import com.recipe.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/oauth2/callback")
    public ResponseEntity<Map<String, String>> oauth2Callback(@AuthenticationPrincipal OAuth2User oauth2User) {
        if (oauth2User == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Authentication failed"));
        }

        // Extract user info from OAuth2User
        String email = oauth2User.getAttribute("email");
        String firstName = oauth2User.getAttribute("given_name");
        String lastName = oauth2User.getAttribute("family_name");
        String picture = oauth2User.getAttribute("picture");
        
        // Determine provider (this is simplified, in production you'd get this from the registration ID)
        String provider = oauth2User.getAttribute("provider") != null ? 
                          oauth2User.getAttribute("provider") : "google";
        String providerId = oauth2User.getName();

        // Create or find user
        User user = authService.findOrCreateOAuthUser(provider, providerId, email, firstName, lastName, picture);
        AuthResponse response = authService.createAuthResponse(user);

        // Return token and user info
        // In a real app, you'd redirect to frontend with token as query param or use state parameter
        return ResponseEntity.ok(Map.of(
            "token", response.getToken(),
            "userId", response.getUserId().toString(),
            "email", response.getEmail(),
            "redirectUrl", "http://localhost:4200?token=" + response.getToken()
        ));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestParam String token) {
        try {
            authService.verifyEmail(token);
            return ResponseEntity.ok(Map.of("message", "Email verified successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<Map<String, String>> resendVerification(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            authService.resendVerificationEmail(email);
            return ResponseEntity.ok(Map.of("message", "Verification email sent"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
