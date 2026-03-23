<template>
  <div class="vm-login-screen">

    <!-- LEFT BRANDED PANEL -->
    <div class="vm-login-left">
      <div class="vm-login-logo">
        <span class="vm-login-logo-dot" />
        Volunteer Mediate
      </div>
      <div>
        <h2 class="vm-login-headline">Make your time<br />matter.</h2>
        <p class="vm-login-sub">
          Join thousands of volunteers and organizations creating real change in communities worldwide.
        </p>
      </div>
      <div class="vm-login-stats">
        <div v-for="s in stats" :key="s.label">
          <div class="vm-login-stat-val">{{ s.val }}</div>
          <div class="vm-login-stat-lbl">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- RIGHT FORM PANEL -->
    <div class="vm-login-right">
      <div class="vm-login-form">
        <h2>{{ isLogin ? 'Welcome back' : 'Create your account' }}</h2>
        <p>{{ isLogin ? 'Sign in to continue your volunteer journey.' : 'Join the community today.' }}</p>

        <!-- mode toggle -->
        <div class="vm-login-toggle">
          <button
            v-for="m in ['login','signup']"
            :key="m"
            class="vm-login-toggle-btn"
            :class="{ active: mode === m }"
            @click="mode = m"
          >
            {{ m === 'login' ? 'Log In' : 'Sign Up' }}
          </button>
        </div>

        <!-- signup extras -->
        <template v-if="!isLogin">
          <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#64748B;margin-bottom:12px;">
            I am joining as
          </p>

          <div class="vm-role-pick">
            <div
              v-for="r in roles" :key="r.val"
              class="vm-role-card"
              :class="{ active: role === r.val }"
              @click="role = r.val"
            >
              <div class="vm-role-icon">{{ r.icon }}</div>
              <div class="vm-role-label">{{ r.label }}</div>
              <div class="vm-role-sub">{{ r.sub }}</div>
            </div>
          </div>

          <!-- photo upload -->
          <div class="vm-av-upload-wrap">
            <div class="vm-av-upload-preview" @click="fileInput?.click()">
              <img v-if="photoPreview" :src="photoPreview" alt="" />
              <span v-else style="font-size:28px;">{{ nameInitials || '📷' }}</span>
            </div>
            <input ref="fileInput" type="file" accept="image/*" style="display:none;" @change="handlePhoto" />
            <div class="vm-av-upload-hint">
              <strong @click="fileInput?.click()">Upload a profile photo</strong><br />
              JPG, PNG or GIF · Optional<br />
              <span style="font-size:11px;color:#94A3B8;">Click the circle to choose</span>
            </div>
          </div>

          <div class="vm-form-group">
            <label class="vm-form-label">{{ role === 'company' ? 'Organization Name' : 'Full Name' }}</label>
            <input class="vm-form-input" placeholder="Your name" v-model="name" />
          </div>
        </template>

        <div class="vm-form-group">
          <label class="vm-form-label">Email</label>
          <input class="vm-form-input" type="email" placeholder="you@example.com" v-model="email" />
        </div>
        <div class="vm-form-group">
          <label class="vm-form-label">Password</label>
          <input class="vm-form-input" type="password" placeholder="••••••••" v-model="pw" />
        </div>

        <button
          class="vm-btn vm-btn-primary"
          style="width:100%;justify-content:center;padding:12px 20px;font-size:15px;margin-top:4px;"
          @click="submit"
        >
          {{ isLogin ? 'Log In →' : 'Create Account →' }}
        </button>

        <p style="font-size:12px;color:#94A3B8;text-align:center;margin-top:20px;">
          Demo: fill in any email and press the button.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
definePageMeta({ layout: false })

const store  = useAppStore()
const router = useRouter()

const mode         = ref<'login'|'signup'>('login')
const role         = ref<'user'|'company'>('user')
const name         = ref('')
const email        = ref('')
const pw           = ref('')
const photoPreview = ref('')
const fileInput    = ref<HTMLInputElement | null>(null)

const isLogin      = computed(() => mode.value === 'login')
const nameInitials = computed(() => name.value.slice(0,2).toUpperCase())

const stats = [
  { val:'12K+', label:'Volunteers'    },
  { val:'340+', label:'Programs'      },
  { val:'80+',  label:'Organizations' },
]
const roles = [
  { val:'user',    icon:'🙋', label:'Volunteer',    sub:'Join & participate' },
  { val:'company', icon:'🏢', label:'Organization', sub:'Create programs'    },
]

function handlePhoto(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  photoPreview.value = URL.createObjectURL(file)
}

function submit() {
  if (!email.value) return
  store.login({
    id:        'me',
    name:      name.value || email.value.split('@')[0],
    email:     email.value,
    type:      role.value,
    avatar:    (name.value || email.value).slice(0,2).toUpperCase(),
    photo:     photoPreview.value,
    score: 0, programs: 0, challenges: 0, bio: '',
  })
  store.showToast(`Welcome, ${store.currentUser?.name}! 🎉`)
  router.push('/')
}
</script>
