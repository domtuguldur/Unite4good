<template>
  <div class="vm-page">
    <button class="vm-back-btn" @click="router.back()">← Back</button>
    <div class="vm-breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><span class="vm-breadcrumb-sep">/</span>
      <NuxtLink to="/programs">Programs</NuxtLink><span class="vm-breadcrumb-sep">/</span>
      <span>{{ program?.title ?? '' }}</span>
    </div>

    <div v-if="!program" class="vm-info-box vm-info-box-green">Program not found.</div>

    <template v-else>
      <div class="vm-detail-header" :style="{ borderTop: `4px solid ${stripeColor}` }">
        <div style="display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;">
          <span class="vm-badge vm-badge-green">{{ program.category }}</span>
          <span v-if="program.score > 0" class="vm-score">{{ stars(program.score) }} {{ program.score }}</span>
        </div>
        <h1 class="serif" style="font-size:38px;margin-bottom:10px;letter-spacing:-.5px;">{{ program.title }}</h1>
        <p style="color:#64748B;font-size:14.5px;margin-bottom:22px;">
          {{ program.org }} · Organized by <strong style="color:#1E293B;">{{ program.organizer }}</strong> · {{ program.date }}
        </p>
        <div style="display:flex;gap:28px;font-size:13.5px;margin-bottom:26px;flex-wrap:wrap;align-items:center;">
          <span><span style="color:#64748B;">Volunteers: </span><strong>{{ program.joined }} / {{ program.spots }}</strong></span>
          <div style="width:180px;background:#E2E8F0;border-radius:4px;height:6px;">
            <div :style="{ width:`${Math.min(100,program.joined/program.spots*100)}%`, height:'100%', background:stripeColor, borderRadius:'4px' }" />
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button v-if="!joined" class="vm-btn vm-btn-primary" @click="join">Join Program</button>
          <span v-else style="color:#2DBAB3;font-weight:700;font-size:14px;">✓ Joined</span>
          <NuxtLink v-if="org" :to="`/profile/${org.id}`" class="vm-btn vm-btn-outline">View Organization</NuxtLink>
        </div>
      </div>

      <div class="vm-detail-body">
        <div>
          <div class="vm-card" style="margin-bottom:20px;">
            <h2 class="serif" style="font-size:21px;margin-bottom:14px;">About this Program</h2>
            <p style="line-height:1.85;color:#64748B;font-size:14.5px;">{{ program.desc }}</p>
          </div>
          <div class="vm-card" style="margin-bottom:20px;">
            <h2 class="serif" style="font-size:21px;margin-bottom:16px;">Rate this Program</h2>
            <StarRating v-model="scoreGiven" @rated="store.showToast('Thanks for rating!')" />
          </div>
          <div class="vm-card">
            <CommentSection :initial-comments="sampleComments" />
          </div>
        </div>
        <div>
          <div class="vm-sidebar-box">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#64748B;margin-bottom:16px;">Program Details</p>
            <div v-for="([k,v]) in details" :key="k" style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #E2E8F0;">
              <p style="font-size:11px;color:#94A3B8;text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:3px;">{{ k }}</p>
              <p style="font-size:14px;font-weight:500;">{{ v }}</p>
            </div>
          </div>
          <div v-if="org" class="vm-sidebar-box">
            <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#64748B;margin-bottom:16px;">Organization</p>
            <div style="display:flex;gap:12px;align-items:center;margin-bottom:14px;">
              <div class="vm-avatar vm-avatar-lg">{{ org.avatar }}</div>
              <div>
                <p style="font-weight:700;font-size:15px;">{{ org.name }}</p>
                <span class="vm-score" style="font-size:13px;">{{ stars(org.score) }} {{ org.score }}</span>
              </div>
            </div>
            <p style="font-size:13px;color:#64748B;margin-bottom:14px;line-height:1.6;">{{ org.bio }}</p>
            <NuxtLink :to="`/profile/${org.id}`" class="vm-btn vm-btn-outline vm-btn-sm" style="display:flex;justify-content:center;">View Profile →</NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, COMPANIES, SAMPLE_COMMENTS, CAT_COLOR } from '~/stores/app'
import { useStars } from '~/composables/useStars'
definePageMeta({ layout: 'default', middleware: 'auth' })

const store  = useAppStore()
const route  = useRoute()
const router = useRouter()
const stars  = useStars

const program     = computed(() => store.getProgram(route.params.id as string))
const org         = computed(() => program.value ? COMPANIES.find(c => c.id === program.value!.orgId) : null)
const stripeColor = computed(() => CAT_COLOR[program.value?.category ?? ''] ?? '#2DBAB3')
const details     = computed(() => program.value ? [
  ['Category',  program.value.category],
  ['Date',      program.value.date],
  ['Spots',     `${program.value.joined} joined · ${program.value.spots} max`],
  ['Organizer', program.value.organizer],
] : [])

const joined      = ref(false)
const scoreGiven  = ref(0)
const sampleComments = [...SAMPLE_COMMENTS]

function join() { joined.value = true; store.showToast('You joined this program! 🎉') }
</script>
