export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { sun: '#E8743B', gold: '#E8743B', paper: '#FAF7F2', ink: '#2B2A28', mute: '#77726B', line: '#E9E3DA', sage: '#6E9C8B' },
      fontFamily: { sans: ['Inter', 'Noto Sans Tamil', 'system-ui', 'sans-serif'] },
      keyframes: {
        sos: { '0%': { boxShadow: '0 0 0 0 rgba(239,68,68,.6)' }, '100%': { boxShadow: '0 0 0 22px rgba(239,68,68,0)' } },
        breathe: { '0%,100%': { transform: 'scale(.6)' }, '40%': { transform: 'scale(1)' }, '60%': { transform: 'scale(1)' } },
        fade: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } }
      },
      animation: { sos: 'sos 1.6s infinite', breathe: 'breathe 14s ease-in-out infinite', float: 'float 9s ease-in-out infinite', fade: 'fade .35s ease-out' }
    }
  }
}
