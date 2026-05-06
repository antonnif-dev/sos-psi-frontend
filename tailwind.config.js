/** @type {import('tailwindcss').Config'} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4F46E5",
                "primary-hover": "#4338CA",
                background: "#F9FAFB",
                card: "#FFFFFF",
                border: "#E5E7EB",
                text: "#111827",
                muted: "#6B7280",
                success: "#10B981",
                danger: "#EF4444"
            }
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'spin-reverse': 'spin 2.5s linear infinite reverse',
                'loading': 'loading 1.4s ease-in-out infinite',
            },
            keyframes: {
                loading: {
                    '0%': { transform: 'translateX(-100%)' },
                    '50%': { transform: 'translateX(50%)' },
                    '100%': { transform: 'translateX(200%)' },
                }
            }
        }
    },
    plugins: []
}
