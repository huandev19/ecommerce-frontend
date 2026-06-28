// ===== CORE TYPES - Match Backend AuthResponse.java =====

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;          // ADD - backend provides computed fullName
    phone?: string;            // ADD - backend provides phone
    avatarUrl?: string;        // RENAME from avatar → avatarUrl - match backend
    status: 'ACTIVE' | 'INACTIVE' | 'BANNED';  // ADD - match UserStatus enum
    emailVerified: boolean;    // ADD - backend provides this
    role: 'customer' | 'admin';
    createdAt?: string;        // ADD - ISO date string from LocalDateTime
    lastLoginAt?: string;      // ADD - ISO date string from LocalDateTime
}

export interface AuthResponse {
    accessToken: string;       // RENAME from token → accessToken - match backend
    refreshToken: string;      // MAKE REQUIRED - backend always returns both
    tokenType: string;         // ADD - backend returns "Bearer"
    expiresIn: number;         // MAKE REQUIRED - backend returns expires duration
    user: User;
}

// ===== API REQUEST TYPES - Match Backend DTOs =====

export interface RegisterRequest {
    firstName: string;         // NOT fullName - backend expects separate fields
    lastName: string;
    email: string;
    password: string;
    phone?: string;            // ADD - backend RegisterRequest has phone
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

// ===== UI-ONLY TYPES - NOT sent to backend =====

export interface RegisterFormValues {
    fullName: string;          // UI-only: will be split into firstName + lastName
    email: string;
    password: string;
    confirmPassword: string;   // UI-only: validation only, not sent to API
    acceptTerms: boolean;      // UI-only: validation only, not sent to API
    phone?: string;            // Optional phone field
}

