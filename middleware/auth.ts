// middleware/auth.ts
// Applied to all routes except /login via definePageMeta({ middleware: 'auth' })
import { useAppStore } from '~/stores/app'

export default defineNuxtRouteMiddleware((to) => {
  const store = useAppStore()
  if (!store.isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }
})
