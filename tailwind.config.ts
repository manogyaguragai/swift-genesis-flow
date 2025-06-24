
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'open-sans-thin': ['Open Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'ibm': ['IBM Plex Sans', 'sans-serif'],
      },
      fontSize: {
        'xs-thin': ['0.6875rem', { lineHeight: '1rem', fontWeight: '200' }], // Increased from 100
        'sm-thin': ['0.8125rem', { lineHeight: '1.25rem', fontWeight: '200' }], // Increased from 100
        'base-thin': ['0.9375rem', { lineHeight: '1.5rem', fontWeight: '200' }], // Increased from 100
        'lg-thin': ['1.0625rem', { lineHeight: '1.75rem', fontWeight: '200' }], // Increased from 100
        'xl-thin': ['1.1875rem', { lineHeight: '1.75rem', fontWeight: '200' }], // Increased from 100
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2563eb",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "float": "float 6s ease-in-out infinite"
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 25px 50px -12px rgba(31, 38, 135, 0.25)',
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.15)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
