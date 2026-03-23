// composables/useStars.ts
export const useStars = (n: number) =>
  n > 0
    ? '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n))
    : '☆☆☆☆☆'
