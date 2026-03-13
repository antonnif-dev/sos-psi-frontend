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
}
},
plugins: []
}
