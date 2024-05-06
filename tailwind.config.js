/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        mentorBlue: "#121481",
        navbarHover: "#1b1e9a",
        bodyText: " #555555",
        textHeadline: "Headlines",
        cardsBG: "#F3F2F1",
        cardButton: "#0078D7",
        cardButtonHover: "#4984fb",
        sendMessages: "#172e59",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
};
