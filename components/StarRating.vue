<template>
  <div style="display:flex;align-items:center;gap:4px;">
    <button
      v-for="n in 5"
      :key="n"
      class="vm-star-btn"
      :class="{ active: n <= modelValue }"
      @click="emit('update:modelValue', n); emit('rated', n)"
    >★</button>
    <span v-if="modelValue > 0" style="font-size:13px;color:#2DBAB3;font-weight:600;margin-left:8px;">
      You rated {{ modelValue }}/5 ★
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: number }>()
const emit = defineEmits<{
  'update:modelValue': [n: number]
  'rated': [n: number]
}>()
</script>
