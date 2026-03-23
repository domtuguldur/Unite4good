<template>
  <div>
    <h2 class="serif" style="font-size:21px;margin-bottom:16px;">
      Comments
      <span style="color:#64748B;font-size:15px;font-family:'DM Sans',sans-serif;font-weight:400;">({{ comments.length }})</span>
    </h2>

    <div class="vm-form-group">
      <textarea class="vm-form-input" placeholder="Share your experience or ask a question…" v-model="newComment" />
    </div>
    <button class="vm-btn vm-btn-outline vm-btn-sm" style="margin-bottom:22px;" @click="postComment">
      Post Comment
    </button>

    <div v-for="c in comments" :key="c.id" class="vm-comment">
      <div class="vm-avatar">
        <img v-if="c.photo" :src="c.photo" alt="" />
        <span v-else>{{ c.avatar }}</span>
      </div>
      <div>
        <p style="font-weight:600;font-size:13.5px;">
          {{ c.user }}
          <span style="color:#94A3B8;font-weight:400;font-size:12px;margin-left:4px;">{{ c.time }}</span>
        </p>
        <p style="font-size:13.5px;color:#64748B;margin-top:4px;line-height:1.6;">{{ c.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const store = useAppStore()
const props = defineProps<{ initialComments: any[] }>()
const emit  = defineEmits<{ posted: [] }>()

const comments   = ref([...props.initialComments])
const newComment = ref('')

function postComment() {
  if (!newComment.value.trim()) return
  comments.value.unshift({
    id:     'n' + Date.now(),
    user:   store.currentUser?.name ?? 'You',
    avatar: store.currentUser?.avatar ?? 'YO',
    photo:  store.currentUser?.photo  ?? '',
    text:   newComment.value,
    time:   'just now',
  })
  newComment.value = ''
  store.showToast('Comment posted.')
  emit('posted')
}
</script>
