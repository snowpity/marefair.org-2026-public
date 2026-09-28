/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'; // Necessary for making new tailwind classes

const backfaceVisibility = plugin(function({addUtilities}) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
      '-moz-backface-visibility': 'visible',
      '-webkit-backface-visibility': 'visible',
      '-ms-backface-visibility': 'visible'
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
      '-ms-backface-visibility': 'hidden'
    }
  })
});

const fadeGradient = `linear-gradient(
  to right,
  rgba(0, 0, 0, 1) calc(50% - 1500px),
  rgba(0, 0, 0, 0.7) calc(50% - 900px),
  rgba(0, 0, 0, 0) calc(50% - 300px),
  rgba(0, 0, 0, 0) calc(50% + 300px),
  rgba(0, 0, 0, 0.7) calc(50% + 900px),
  rgba(0, 0, 0, 1) calc(50% + 1500px)
)`;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'graffiti-brick-texture': `${fadeGradient}, url('/bg/brick4_shadow.webp'), url('/bg/graffiti.webp'), url('/bg/plain-brick.webp')`,
        'plain-brick-texture': `${fadeGradient}, url('/bg/brick4_shadow.webp'), url('/bg/plain-brick.webp')`,
        'plain-brick-texture-sm': `${fadeGradient}, url('/bg/brick4_shadow.webp'), url('/bg/plain-brick.webp')`,
        'news-brick-texture': `${fadeGradient}, url('/bg/random-papers.webp'), url('/bg/brick4_shadow.webp'), url('/bg/plain-brick.webp')`,
        // 'white-paint-texture': `${fadeGradient}, url('/bg/brick4_shadow.webp'), url('/bg/whitepaint.png'), url('/bg/plain-brick.webp')`,
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(2deg)' },
          '50%': { transform: 'translate(0, -3px) rotate(-2deg)' },
        }
      },
      animation: {
        floating: 'floating 4s var(--sine) infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    backfaceVisibility,
  ],
}
