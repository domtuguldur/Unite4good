<template>
  <div style="min-height:100vh;background:#F5F8FA;">

    <!-- ── NAV ── -->
    <nav class="vm-nav">
      <!-- Logo -->
      <NuxtLink to="/" class="vm-nav-logo">
        <span class="vm-nav-logo-dot" />
        Unite For Good
      </NuxtLink>

      <!-- Center links -->
      <div class="vm-nav-tabs">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="vm-nav-tab"
          :class="{ active: isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Right: avatar + logout -->
      <div class="vm-nav-right">
        <div class="vm-avatar">
          <img v-if="store.currentUser?.photo" :src="store.currentUser.photo" alt="" />
          <span v-else>{{ store.currentUser?.avatar ?? '?' }}</span>
        </div>
        <button class="vm-btn vm-btn-ghost vm-btn-sm" @click="logout">
          Гарах
        </button>
      </div>
    </nav>

    <!-- ── PAGE CONTENT ── -->
    <main>
      <NuxtPage />
    </main>

  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const store  = useAppStore()
const router = useRouter()
const route  = useRoute()

const navLinks = [
  { to: '/',           label: 'Нүүр' },
  { to: '/programs',   label: 'Хөтөлбөрүүд' },
  { to: '/challenges', label: 'Сорилтууд' },
  { to: '/directory',  label: 'Жагсаалт' },
  { to: '/profile/me', label: 'Миний профайл' },
]

function isActive(to: string) {
  return to === '/'
    ? route.path === '/'
    : route.path.startsWith(to)
}

function logout() {
  store.logout()
  router.push('/login')
}
</script>
