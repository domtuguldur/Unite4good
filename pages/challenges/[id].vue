<template>
  <div class="vm-page">
    <button class="vm-back-btn" @click="router.back()">← Back</button>
    <div class="vm-breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><span class="vm-breadcrumb-sep">/</span>
      <NuxtLink to="/challenges">Challenges</NuxtLink><span class="vm-breadcrumb-sep">/</span>
      <span>{{ challenge?.title ?? '' }}</span>
    </div>
    <div v-if="!challenge" class="vm-info-box vm-info-box-green">Challenge not found.</div>
    <template v-else>
      <div class="vm-detail-header" style="border-top:4px solid #FF8A65;">
        <span class="vm-badge vm-badge-warm" style="margin-bottom:18px;">🔥 Challenge</span>
        <h1 class="serif" style="font-size:38px;margin-bottom:10px;letter-spacing:-.5px;">{{ challenge.title }}</h1>
        <p style="color:#64748B;font-size:14.5px;margin-bottom:22px;">
          Created by <strong style="color:#1E293B;">{{ challenge.creator }}</strong>
          · {{ challenge.date }}
          · <strong style="color:#1E293B;">{{ challenge.joined.toLocaleString() }}</strong> participants
        </p>
        <div style="display:flex;gap:10px;">
          <button v-if="!accepted" class="vm-btn vm-btn-warn" @click="accept">Accept Challenge</button>
          <span v-else style="color:#FF8A65;font-weight:700;font-size:14px;">🔥 Challenge accepted</span>
        </div>
      </div>
      <div class="vm-detail-body">
        <div>
          <div class="vm-card" style="margin-bottom:20px;">
            <h2 class="serif" style="font-size:21px;margin-bottom:14px;">About this Challenge</h2>
            <p style="line-height:1.85;color:#64748B;font-size:14.5px;">{{ challenge.desc }}</p>
          </div>
          <div class="vm-card" style="margin-bottom:20px;">
            <h2 class="serif" style="font-size:21px;margin-bottom:16px;">Rate this Challenge</h2>
            <StarRating v-model="scoreGiven" @rated="store.showToast('Thanks for rating!')" />
          </div>
          <div class="vm-card">
            <CommentSection :initial-comments="sampleComments" />
          </div>
        </div>
        <div>
          <div class="vm-sidebar-box">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#64748B;margin-bottom:16px;">Details</p>
            <div v-for="([k,v]) in details" :key="k" style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #E2E8F0;">
              <p style="font-size:11px;color:#94A3B8;text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:3px;">{{ k }}</p>
              <p style="font-size:14px;font-weight:500;">{{ v }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useAppStore, SAMPLE_COMMENTS } from '~/stores/app'
definePageMeta({ layout: 'default', middleware: 'auth' })
const store   = useAppStore()
const route   = useRoute()
const router  = useRouter()
const challenge      = computed(() => store.getChallenge(route.params.id as string))
const details        = computed(() => challenge.value ? [
  ['Status',       challenge.value.date],
  ['Participants', challenge.value.joined.toLocaleString()],
  ['Tags',         challenge.value.tags.join(', ')],
] : [])
const accepted       = ref(false)
const scoreGiven     = ref(0)
const sampleComments = SAMPLE_COMMENTS.slice(0,2)
function accept() { accepted.value = true; store.showToast('Challenge accepted! 🔥') }
</script>
