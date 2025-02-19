export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#1E40AF", // Deep blue for buttons, links
          secondary: "#9333EA", // Purple accent
          background: "#0F172A", // Dark mode background
          card: "#1E293B", // Card background
          text: "#E2E8F0", // Light text color
          success: "#22C55E", // Green for success messages
          danger: "#EF4444", // Red for errors
          warning: "#FACC15", // Yellow for warnings
        },
        fontFamily: {
          sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        },
        boxShadow: {
          soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
          strong: "0 10px 20px rgba(0, 0, 0, 0.3)",
        },
        spacing: {
          18: "4.5rem", // Custom spacing
        },
        borderRadius: {
          xl: "1rem", // More rounded corners
        },
      },
    },
    plugins: [
      require("@tailwindcss/forms"),       // Improves form styling
      require("@tailwindcss/typography"),  // Better text readability
      require("@tailwindcss/aspect-ratio"),  // Helps with images and video layouts
    ],
  };
  