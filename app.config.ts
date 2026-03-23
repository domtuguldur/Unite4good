// app.config.ts
// Nuxt UI reads this to override its default design tokens.
export default defineAppConfig({
  ui: {
    primary:   'teal',
    gray:      'slate',
    // Override specific component defaults
    button: {
      rounded: 'rounded-lg',
    },
    card: {
      rounded: 'rounded-xl',
    },
    badge: {
      rounded: 'rounded-full',
    },
    input: {
      rounded: 'rounded-lg',
    },
    textarea: {
      rounded: 'rounded-lg',
    },
    avatar: {
      rounded: 'rounded-full',
    },
  },
})
