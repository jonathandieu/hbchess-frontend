module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75' viewBox='0 0 8 8'%3E%3Cg fill='%230c8e23' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E")`
      },
      colors: {
        'forest-green-web': '#0C8E23',
        nyanza: '#B9F3B9',
        cadet: '#5D737E',
        'dark-liver': '#55505C'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
