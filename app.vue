<template>
  <div style="min-height:100vh;background:#F5F8FA;">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Global Toast -->
    <Transition name="vm-toast-anim">
      <div v-if="store.toast" class="vm-toast">
        {{ store.toast }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
const store = useAppStore()
</script>

<style>
.vm-toast-anim-enter-active { transition: all .28s cubic-bezier(.16,1,.3,1); }
.vm-toast-anim-leave-active { transition: all .2s ease; }
.vm-toast-anim-enter-from   { transform: translateX(60px); opacity: 0; }
.vm-toast-anim-leave-to     { transform: translateX(60px); opacity: 0; }
</style>
