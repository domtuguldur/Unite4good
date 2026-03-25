<template>
  <div class="vm-page">

    <div class="vm-section-header" style="margin-bottom:24px;">
      <div>
        <h1 class="serif" style="font-size:34px;">Сорилтууд</h1>
        <p style="color:#64748B;font-size:14px;margin-top:4px;">Урам өгч, урам аваарай</p>
      </div>
      <button class="vm-btn vm-btn-warn" @click="creating = !creating">🔥 Сорилт үүсгэх</button>
    </div>

    <div v-if="creating" class="vm-card" style="margin-bottom:28px;border-color:#FF8A65;border-width:2px;">
      <h3 class="serif" style="font-size:22px;margin-bottom:20px;">Шинэ сорилт</h3>
      <div class="vm-form-group">
        <label class="vm-form-label">Гарчиг *</label>
        <input class="vm-form-input" placeholder="жишээ: 30 хоног алхах сорилт" v-model="form.title" />
      </div>
      <div class="vm-form-group">
        <label class="vm-form-label">Тайлбар</label>
        <textarea class="vm-form-input" placeholder="Яаж ажиллах вэ? Хүмүүс хэрхэн оролцох вэ?" v-model="form.desc" />
      </div>
      <div style="display:flex;gap:10px;">
        <button class="vm-btn vm-btn-warn"  @click="handleCreate">Нийтлэх</button>
        <button class="vm-btn vm-btn-ghost" @click="creating = false">Цуцлах</button>
      </div>
    </div>

    <div class="vm-card-grid">
      <ProgramCard v-for="c in store.challenges" :key="c.id" :item="c" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
definePageMeta({ layout: 'default', middleware: 'auth' })

const store    = useAppStore()
const creating = ref(false)
const form     = reactive({ title:'', desc:'' })

function handleCreate() {
  if (!form.title.trim()) { store.showToast('Гарчиг оруулна уу.'); return }
  store.addChallenge({
    id:'ch'+Date.now(), type:'challenge', title:form.title,
    creator:store.currentUser!.name, creatorId:'me',
    joined:1, desc:form.desc||'Шинэ нийгмийн сорилт.', tags:['community'], date:'Үргэлжилж байна',
  })
  Object.assign(form, { title:'', desc:'' })
  creating.value = false
  store.showToast('Сорилт амжилттай нийтлэгдлээ! 🔥')
}
</script>
