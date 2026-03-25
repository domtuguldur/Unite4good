<template>
  <div class="vm-page">

    <div class="vm-section-header" style="margin-bottom:24px;">
      <div>
        <h1 class="serif" style="font-size:34px;">Сайн дурын хөтөлбөрүүд</h1>
        <p style="color:#64748B;font-size:14px;margin-top:4px;">{{ filtered.length }} хөтөлбөр байна</p>
      </div>
      <button v-if="store.isCompany" class="vm-btn vm-btn-primary" @click="creating = !creating">
        + Хөтөлбөр үүсгэх
      </button>
    </div>

    <div v-if="!store.isCompany" class="vm-info-box vm-info-box-green">
      💡 Зөвхөн байгууллагын аккаунт хөтөлбөр үүсгэх боломжтой.
      <NuxtLink to="/profile/me" style="color:#0097A7;font-weight:600;">Аккаунтаа шинэчлэх →</NuxtLink>
    </div>

    <!-- create form -->
    <div v-if="creating" class="vm-card" style="margin-bottom:28px;border-color:#2DBAB3;border-width:2px;">
      <h3 class="serif" style="font-size:22px;margin-bottom:20px;">Шинэ сайн дурын хөтөлбөр</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="vm-form-group" style="grid-column:1/-1;">
          <label class="vm-form-label">Гарчиг *</label>
          <input class="vm-form-input" placeholder="Хөтөлбөрийн нэр" v-model="form.title" />
        </div>
        <div class="vm-form-group">
          <label class="vm-form-label">Ангилал</label>
          <select class="vm-form-input" v-model="form.category">
            <option v-for="c in CATEGORIES.slice(1)" :key="c">{{ c }}</option>
          </select>
        </div>
        <div class="vm-form-group">
          <label class="vm-form-label">Огноо</label>
          <input class="vm-form-input" type="date" v-model="form.date" />
        </div>
        <div class="vm-form-group">
          <label class="vm-form-label">Сайн дурынхны дээд тоо</label>
          <input class="vm-form-input" type="number" placeholder="жишээ: 30" v-model="form.spots" />
        </div>
        <div class="vm-form-group" style="grid-column:1/-1;">
          <label class="vm-form-label">Тайлбар *</label>
          <textarea class="vm-form-input" style="min-height:100px;" placeholder="Сайн дурынхан юу хийх вэ?" v-model="form.desc" />
        </div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="vm-btn vm-btn-primary" @click="handleCreate">Нийтлэх</button>
        <button class="vm-btn vm-btn-ghost"   @click="creating = false">Цуцлах</button>
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
        Энэ ангилалд одоогоор хөтөлбөр байхгүй байна.
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
definePageMeta({ layout: 'default', middleware: 'auth' })

const store = useAppStore()
const CATEGORIES = ['Бүгд','Байгаль орчин','Боловсрол','Нийгэм','Өлсгөлөн','Эрүүл мэнд','Амьтад']
const filter   = ref('Бүгд')
const creating = ref(false)
const form     = reactive({ title:'', category:'Байгаль орчин', date:'', spots:'', desc:'' })

const filtered = computed(() =>
  filter.value === 'Бүгд' ? store.programs : store.programs.filter(p => p.category === filter.value)
)

function handleCreate() {
  if (!form.title.trim() || !form.desc.trim()) { store.showToast('Гарчиг болон тайлбарыг бөглөнө үү.'); return }
  store.addProgram({
    id:'p'+Date.now(), type:'program', title:form.title,
    org:store.currentUser!.name, orgId:'me', category:form.category,
    date:form.date||'Тодорхойгүй', spots:parseInt(form.spots as any)||20,
    joined:0, score:0, desc:form.desc,
    organizer:store.currentUser!.name, tags:[form.category.toLowerCase()],
  })
  Object.assign(form, { title:'', category:'Байгаль орчин', date:'', spots:'', desc:'' })
  creating.value = false
  store.showToast('Хөтөлбөр амжилттай нийтлэгдлээ! 🎉')
}
</script>
