/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    fontFamily: {
      neonderthaw: 'Neonderthaw',
      raleway: 'Raleway',
      poppins: 'Poppins',
      knewave: 'Knewave',
      rampartone: 'Rampart One',
      dokdo: 'Dokdo',
      montserrat: 'Montserrat',
    },
    extend: {
      backgroundImage: {
        'mainmenu': "url('/images/background.svg')",
        'game-3-bg': "url('/images/game-3-bg.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }

  },
  plugins: [],
}
