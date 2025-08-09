"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types/user';
import { jwtDecode } from 'jwt-decode';

interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (userData: RegisterData) => Promise<boolean>;
    isLoading: boolean;
    isLoggedIn: boolean;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    company?: string;
    licenseNumber?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for existing user session
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            try {
                const userData: User = jwtDecode<User>(savedToken);
                setUser(userData);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulate API call
            const respons = await fetch("http://localhost:8080/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!respons.ok) {
                setIsLoggedIn(false);
                return false; // Handle error response
            }

            const { token } = await respons.json();
            localStorage.setItem('token', token);
            const userData: User = jwtDecode<User>(token);
            setUser(userData);
            setIsLoggedIn(true);

            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    const register = async (userData: RegisterData): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulate API call
            const response = await fetch("http://localhost:8080/api/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                console.log('Registration error:', response.statusText);
                return false; // Handle error response
            }

            const { token } = await response.json();
            localStorage.setItem('token', token);
            const newUser: User = jwtDecode<User>(token);
            setUser(newUser);
            setIsLoggedIn(true);
            setIsLoggedIn(true);
            return true;

        } catch (error) {
            console.error('Registration error:', error);
            setIsLoggedIn(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, register, isLoading, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

