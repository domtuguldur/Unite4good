<template>
  <div class="vm-page">
    <button class="vm-back-btn" @click="router.back()">← Back</button>
    <div v-if="!user" class="vm-info-box vm-info-box-green">Profile not found.</div>
    <template v-else>
      <div class="vm-profile-header">
        <div class="vm-profile-cover">
          <img v-if="coverSrc" :src="coverSrc" class="vm-profile-cover-img" alt="" />
          <button v-if="isOwn" class="vm-profile-cover-btn" @click="coverInput?.click()">📷 Change Cover</button>
          <input ref="coverInput" type="file" accept="image/*" style="display:none;" @change="onCoverChange" />
        </div>
        <div class="vm-profile-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;">
            <div class="vm-profile-av-wrap">
              <div class="vm-profile-av-big" @click="isOwn && avatarInput?.click()">
                <img v-if="avatarSrc" :src="avatarSrc" alt="" />
                <span v-else>{{ user.avatar }}</span>
              </div>
              <div v-if="isOwn" class="vm-profile-av-edit" @click="avatarInput?.click()">✏️</div>
              <input ref="avatarInput" type="file" accept="image/*" style="display:none;" @change="onAvatarChange" />
            </div>
            <NuxtLink v-if="isOwn" to="/settings" class="vm-btn vm-btn-outline vm-btn-sm" style="margin-bottom:8px;">Edit Profile</NuxtLink>
          </div>
          <h1 class="serif" style="font-size:27px;margin-bottom:4px;letter-spacing:-.3px;">{{ user.name }}</h1>
          <span class="vm-badge vm-badge-stone" style="margin-bottom:10px;">{{ isCompany ? 'Organization' : 'Volunteer' }}</span>
          <p style="color:#64748B;font-size:14px;margin-bottom:22px;line-height:1.6;max-width:540px;">{{ user.bio || 'No bio yet.' }}</p>
          <div class="vm-stat-row">
            <div class="vm-stat-box">
              <span class="vm-stat-val vm-score">{{ user.score > 0 ? user.score : '—' }}</span>
              <span class="vm-stat-lbl">Score</span>
            </div>
            <template v-if="isCompany">
              <div class="vm-stat-box"><span class="vm-stat-val">{{ user.programs }}</span><span class="vm-stat-lbl">Programs</span></div>
              <div class="vm-stat-box"><span class="vm-stat-val">{{ (user as any).volunteers }}</span><span class="vm-stat-lbl">Volunteers</span></div>
            </template>
            <template v-else>
              <div class="vm-stat-box"><span class="vm-stat-val">{{ user.programs }}</span><span class="vm-stat-lbl">Programs</span></div>
              <div class="vm-stat-box"><span class="vm-stat-val">{{ (user as any).challenges }}</span><span class="vm-stat-lbl">Challenges</span></div>
            </template>
          </div>
        </div>
      </div>

      <div class="vm-tabs">
        <button class="vm-tab" :class="{active:tab==='activity'}" @click="tab='activity'">Activity</button>
        <button v-if="isCompany" class="vm-tab" :class="{active:tab==='programs'}" @click="tab='programs'">Programs</button>
        <button class="vm-tab" :class="{active:tab==='reviews'}" @click="tab='reviews'">Reviews</button>
      </div>

      <div v-if="tab==='activity'" style="display:flex;flex-direction:column;gap:12px;">
        <div v-for="(a,i) in activityItems" :key="i" class="vm-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;gap:12px;align-items:center;">
            <div style="width:8px;height:8px;border-radius:50%;background:#2DBAB3;flex-shrink:0;" />
            <span style="font-size:14px;">{{ a.label }}</span>
          </div>
          <div style="display:flex;gap:16px;align-items:center;">
            <span class="vm-score">{{ stars(a.score) }} {{ a.score }}</span>
            <span style="font-size:12px;color:#94A3B8;">{{ a.time }}</span>
          </div>
        </div>
      </div>

      <div v-if="tab==='programs' && isCompany" class="vm-card-grid">
        <NuxtLink v-for="p in orgPrograms" :key="p.id" :to="`/programs/${p.id}`" class="vm-card-link">
          <div class="vm-card" style="padding:0;overflow:hidden;">
            <div :style="{ height:'5px', background: CAT_COLOR[p.category] ?? '#2DBAB3' }" />
            <div style="padding:20px 22px;">
              <span class="vm-badge vm-badge-green" style="margin-bottom:10px;">{{ p.category }}</span>
              <h3 class="serif" style="font-size:17px;margin-bottom:6px;">{{ p.title }}</h3>
              <p style="font-size:13px;color:#64748B;">{{ p.date }} · {{ p.joined }}/{{ p.spots }} spots</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="tab==='reviews'">
        <div v-for="(c,i) in sampleComments" :key="i" class="vm-comment">
          <div class="vm-avatar">{{ c.avatar }}</div>
          <div>
            <p style="font-weight:600;font-size:13.5px;">{{ c.user }} <span style="color:#94A3B8;font-weight:400;font-size:12px;">{{ c.time }}</span></p>
            <p style="font-size:13.5px;color:#64748B;margin-top:4px;line-height:1.6;">{{ c.text }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useAppStore, COMPANIES, VOLUNTEERS, SAMPLE_COMMENTS, CAT_COLOR } from '~/stores/app'
import { useStars } from '~/composables/useStars'
definePageMeta({ layout: 'default', middleware: 'auth' })
const store  = useAppStore()
const route  = useRoute()
const router = useRouter()
const stars  = useStars
const id     = computed(() => route.params.id as string)
const isMe   = computed(() => id.value === 'me')
const user   = computed(() => isMe.value ? store.currentUser : (COMPANIES.find(c=>c.id===id.value) ?? VOLUNTEERS.find(u=>u.id===id.value) ?? null))
const isOwn     = computed(() => isMe.value)
const isCompany = computed(() => user.value?.type === 'company')
const coverInput  = ref<HTMLInputElement|null>(null)
const avatarInput = ref<HTMLInputElement|null>(null)
const coverSrc  = computed(() => isMe.value ? store.currentUser?.cover ?? '' : '')
const avatarSrc = computed(() => isMe.value ? store.currentUser?.photo ?? '' : '')
function onCoverChange(e:Event)  { const f=(e.target as HTMLInputElement).files?.[0]; if(f){store.updateUser({cover:URL.createObjectURL(f)});store.showToast('Cover updated!')} }
function onAvatarChange(e:Event) { const f=(e.target as HTMLInputElement).files?.[0]; if(f){store.updateUser({photo:URL.createObjectURL(f)});store.showToast('Photo updated!')} }
const tab = ref('activity')
const activityItems = computed(() => isCompany.value ? [
  {label:'Published Urban Tree Planting Drive', time:'3 days ago',  score:4.8},
  {label:'Hosted Youth Coding Bootcamp',         time:'1 week ago',  score:4.9},
  {label:'Completed Food Bank Logistics',        time:'2 weeks ago', score:4.7},
] : [
  {label:'Joined Urban Tree Planting Drive',     time:'3 days ago',  score:4.8},
  {label:'Accepted 1-Day No Plastic Challenge',  time:'1 week ago',  score:4.9},
  {label:'Completed Elderly Companion Visit',    time:'2 weeks ago', score:4.7},
])
const orgPrograms    = computed(() => store.programs.filter(p=>p.org===user.value?.name))
const sampleComments = SAMPLE_COMMENTS
</script>
