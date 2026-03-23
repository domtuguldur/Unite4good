<template>
  <div class="vm-page">
    <button class="vm-back-btn" @click="router.back()">← Back</button>
    <h1 class="serif" style="font-size:32px;margin-bottom:24px;">Settings</h1>
    <div class="vm-card" style="max-width:560px;">
      <p class="serif" style="font-size:20px;margin-bottom:20px;">Edit Profile</p>
      <div class="vm-form-group">
        <label class="vm-form-label">Display Name</label>
        <input class="vm-form-input" v-model="form.name" />
      </div>
      <div class="vm-form-group">
        <label class="vm-form-label">Bio</label>
        <textarea class="vm-form-input" placeholder="Tell others about yourself…" v-model="form.bio" />
      </div>
      <div style="display:flex;gap:10px;">
        <button class="vm-btn vm-btn-primary" @click="save">Save Changes</button>
        <button class="vm-btn vm-btn-ghost"   @click="router.back()">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '~/stores/app'
definePageMeta({ layout: 'default', middleware: 'auth' })
const store  = useAppStore()
const router = useRouter()
const form   = reactive({ name: store.currentUser?.name ?? '', bio: store.currentUser?.bio ?? '' })
function save() { store.updateUser({ name: form.name, bio: form.bio }); store.showToast('Profile saved!'); router.back() }
</script>
