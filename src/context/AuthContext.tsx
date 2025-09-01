"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";




export type User = {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    loginUser: (email: string, password: string) => Promise<void>;
    registerUser: (name: string, email: string, password: string, username: string) => Promise<void>;
    logout: () => void;
    updateProfile: (updatedUser: Partial<User>) => void;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();


    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    }, []);

    // Save user/token to localStorage when changed
    useEffect(() => {
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, [user, token]);

    // 🔑 Login
    const loginUser = async (email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");

            setUser(data.user);
            setToken(data.token);
            router.push("/home"); // redirect after login
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    // 📝 Register
    const registerUser = async (name: string, email: string, password: string, username: string) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, username }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");

            setUser(data.user);
            setToken(data.token);
            router.push("/home"); // redirect after register
        } catch (err) {
            console.error("Register error:", err);
            throw err;
        }
    };

    // 🚪 Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login"); // redirect after logout
    };

    // 👤 Update Profile locally
    const updateProfile = (updatedUser: Partial<User>) => {
        if (!user) return;
        const newUser = { ...user, ...updatedUser };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider
            value={{ user, token, loginUser, registerUser, logout, updateProfile, }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
