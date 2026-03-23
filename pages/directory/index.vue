<template>
  <div class="vm-page">
    <div class="vm-section-header" style="margin-bottom:24px;">
      <div>
        <h1 class="serif" style="font-size:34px;">Directory</h1>
        <p style="color:#64748B;font-size:14px;margin-top:4px;">Find organizations and volunteers</p>
      </div>
    </div>
    <div style="display:flex;gap:12px;margin-bottom:24px;align-items:center;flex-wrap:wrap;">
      <div class="vm-tabs" style="margin-bottom:0;border:none;gap:4px;">
        <button class="vm-tab" :class="{active:tab==='companies'}" @click="tab='companies'" style="border-radius:8px;">Organizations</button>
        <button class="vm-tab" :class="{active:tab==='volunteers'}" @click="tab='volunteers'" style="border-radius:8px;">Volunteers</button>
      </div>
      <input class="vm-form-input" style="max-width:220px;margin-bottom:0;" placeholder="Search…" v-model="search" />
    </div>
    <div class="vm-card-grid">
      <NuxtLink v-for="u in list" :key="u.id" :to="`/profile/${u.id}`" class="vm-card-link">
        <div class="vm-card" style="display:flex;gap:16px;align-items:flex-start;">
          <div class="vm-avatar vm-avatar-lg">{{ u.avatar }}</div>
          <div style="flex:1;">
            <h3 style="font-size:15.5px;font-weight:700;margin-bottom:4px;">{{ u.name }}</h3>
            <p style="font-size:12.5px;color:#64748B;margin-bottom:10px;line-height:1.5;">{{ u.bio }}</p>
            <div style="display:flex;gap:14px;font-size:12.5px;flex-wrap:wrap;">
              <span v-if="u.score>0" class="vm-score">{{ stars(u.score) }} {{ u.score }}</span>
              <span style="color:#94A3B8;">
                {{ tab==='companies' ? `${u.programs} programs · ${(u as any).volunteers} vol.` : `${u.programs} programs · ${(u as any).challenges} chall.` }}
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
      <p v-if="list.length===0" style="color:#64748B;font-size:14px;">No results found.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore, COMPANIES, VOLUNTEERS } from '~/stores/app'
import { useStars } from '~/composables/useStars'
definePageMeta({ layout: 'default', middleware: 'auth' })
const stars  = useStars
const tab    = ref('companies')
const search = ref('')
const list   = computed(() => {
  const base = tab.value === 'companies' ? COMPANIES : VOLUNTEERS
  return base.filter(u => u.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>
