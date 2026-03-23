<template>
  <div class="vm-page">

    <div class="vm-section-header" style="margin-bottom:24px;">
      <div>
        <h1 class="serif" style="font-size:34px;">Volunteer Programs</h1>
        <p style="color:#64748B;font-size:14px;margin-top:4px;">{{ filtered.length }} programs available</p>
      </div>
      <button v-if="store.isCompany" class="vm-btn vm-btn-primary" @click="creating = !creating">
        + Create Program
      </button>
    </div>

    <div v-if="!store.isCompany" class="vm-info-box vm-info-box-green">
      💡 Only organization accounts can create programs.
      <NuxtLink to="/profile/me" style="color:#0097A7;font-weight:600;">Upgrade your account →</NuxtLink>
    </div>

    <!-- create form -->
    <div v-if="creating" class="vm-card" style="margin-bottom:28px;border-color:#2DBAB3;border-width:2px;">
      <h3 class="serif" style="font-size:22px;margin-bottom:20px;">New Volunteer Program</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="vm-form-group" style="grid-column:1/-1;">
          <label class="vm-form-label">Title *</label>
          <input class="vm-form-input" placeholder="Program title" v-model="form.title" />
        </div>
        <div class="vm-form-group">
          <label class="vm-form-label">Category</label>
          <select class="vm-form-input" v-model="form.category">
            <option v-for="c in CATEGORIES.slice(1)" :key="c">{{ c }}</option>
          </select>
        </div>
        <div class="vm-form-group">
          <label class="vm-form-label">Date</label>
          <input class="vm-form-input" type="date" v-model="form.date" />
        </div>
        <div class="vm-form-group">
          <label class="vm-form-label">Max Volunteers</label>
          <input class="vm-form-input" type="number" placeholder="e.g. 30" v-model="form.spots" />
        </div>
        <div class="vm-form-group" style="grid-column:1/-1;">
          <label class="vm-form-label">Description *</label>
          <textarea class="vm-form-input" style="min-height:100px;" placeholder="What will volunteers do?" v-model="form.desc" />
        </div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="vm-btn vm-btn-primary" @click="handleCreate">Publish Program</button>
        <button class="vm-btn vm-btn-ghost"   @click="creating = false">Cancel</button>
      </div>
    </div>

    <!-- filter bar -->
    <div class="vm-filter-bar">
      <button
        v-for="cat in CATEGORIES" :key="cat"
        class="vm-btn vm-btn-sm"
        :class="filter === cat ? 'vm-btn-primary' : 'vm-btn-ghost'"
        @click="filter = cat"
      >{{ cat }}</button>
    </div>

    <div class="vm-card-grid">
      <ProgramCard v-for="p in filtered" :key="p.id" :item="p" />
      <p v-if="filtered.length === 0" style="color:#64748B;font-size:14px;grid-column:1/-1;">
        No programs in this category yet.
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
definePageMeta({ layout: 'default', middleware: 'auth' })

const store = useAppStore()
const CATEGORIES = ['All','Environment','Education','Social','Hunger','Health','Animals']
const filter   = ref('All')
const creating = ref(false)
const form     = reactive({ title:'', category:'Environment', date:'', spots:'', desc:'' })

const filtered = computed(() =>
  filter.value === 'All' ? store.programs : store.programs.filter(p => p.category === filter.value)
)

function handleCreate() {
  if (!form.title.trim() || !form.desc.trim()) { store.showToast('Please fill in title and description.'); return }
  store.addProgram({
    id:'p'+Date.now(), type:'program', title:form.title,
    org:store.currentUser!.name, orgId:'me', category:form.category,
    date:form.date||'TBD', spots:parseInt(form.spots as any)||20,
    joined:0, score:0, desc:form.desc,
    organizer:store.currentUser!.name, tags:[form.category.toLowerCase()],
  })
  Object.assign(form, { title:'', category:'Environment', date:'', spots:'', desc:'' })
  creating.value = false
  store.showToast('Program published! 🎉')
}
</script>
