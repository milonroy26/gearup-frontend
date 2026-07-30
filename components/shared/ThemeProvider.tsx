"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

//* Context
const ThemeContext = createContext<ThemeContextValue | null>(null);

//* Provider
export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") {
            return "dark";
        }
        const storedTheme = window.localStorage.getItem("gearup-theme");
        return storedTheme === "light" ? "light" : "dark";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        window.localStorage.setItem("gearup-theme", theme);
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            toggleTheme: () => {
                setTheme((currentTheme) => {
                    const nextTheme = currentTheme === "dark" ? "light" : "dark";

                    return nextTheme;
                });
            },
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

//* Custom Hook
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}
