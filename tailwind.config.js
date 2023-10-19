/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        mentorBlue: "#172e59",
        sendMessages: "#172e59",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
};
