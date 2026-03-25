<template>
  <div class="vm-page">

    <!-- HERO -->
    <div class="vm-hero">
      <span class="vm-badge vm-badge-green" style="font-size:12px;">🌿 Unite For Good</span>
      <h1>Connect. Volunteer.<br /><em>Make It Count.</em></h1>
      <p>Discover meaningful volunteer programs from trusted organizations, take on community challenges, and build a profile that reflects your real-world impact.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <NuxtLink to="/programs"   class="vm-btn vm-btn-primary">Browse Programs →</NuxtLink>
        <NuxtLink to="/challenges" class="vm-btn vm-btn-outline">View Challenges</NuxtLink>
      </div>
    </div>

    <!-- FEATURED PROGRAMS -->
    <div class="vm-section-header">
      <span class="vm-section-title">Featured Programs</span>
      <NuxtLink to="/programs" class="vm-btn vm-btn-ghost vm-btn-sm">See all →</NuxtLink>
    </div>
    <div class="vm-card-grid" style="margin-bottom:44px;">
      <ProgramCard v-for="p in store.programs.slice(0,4)" :key="p.id" :item="p" />
    </div>

    <!-- ACTIVE CHALLENGES -->
    <div class="vm-section-header">
      <span class="vm-section-title">Active Challenges</span>
      <NuxtLink to="/challenges" class="vm-btn vm-btn-ghost vm-btn-sm">See all →</NuxtLink>
    </div>
    <div class="vm-card-grid">
      <ProgramCard v-for="c in store.challenges.slice(0,3)" :key="c.id" :item="c" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
definePageMeta({ layout: 'default', middleware: 'auth' })
const store = useAppStore()
</script>
