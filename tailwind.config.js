/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Poppins', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        geist: ['Geist', 'system-ui', 'sans-serif'],
        heading: ["'Instrument Serif'", 'Cormorant Garamond', 'serif'],
        body: ["'Barlow'", "'Poppins'", 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#F5E9DF',          // Bege Claro
          bgLight: '#FAF4EF',     // Bege Suave / Cards
          crimson: '#A74447',     // Vermelho Queimado
          crimsonDark: '#8F393C', // Vermelho Queimado Hover
          blush: '#DD9299',       // Rosa Velho
          chumbo: '#28242C',      // Cinza Chumbo Escuro
          taupe: '#A59A91',       // Cinza Quente / Taupe
        },
      },
    },
  },
  plugins: [],
}
