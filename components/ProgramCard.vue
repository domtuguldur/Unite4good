<template>
  <NuxtLink :to="cardLink" class="vm-card-link">
    <div class="vm-card" style="padding:0;overflow:hidden;">
      <!-- colored top stripe -->
      <div :style="{ height:'5px', background: stripeColor }" />
      <div style="padding:22px 24px;">
        <!-- badge + score -->
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
          <span :class="`vm-badge ${isChallenge ? 'vm-badge-warm' : 'vm-badge-green'}`">
            {{ isChallenge ? 'Challenge' : item.category }}
          </span>
          <span v-if="!isChallenge && item.score > 0" class="vm-score" style="font-size:13px;">
            {{ stars(item.score) }} {{ item.score }}
          </span>
        </div>
        <!-- title -->
        <h3 class="serif" style="font-size:19px;margin-bottom:8px;line-height:1.25;letter-spacing:-.2px;">
          {{ item.title }}
        </h3>
        <!-- desc -->
        <p style="font-size:13.5px;color:#64748B;margin-bottom:16px;line-height:1.6;">
          {{ item.desc.slice(0, 88) }}…
        </p>
        <!-- footer -->
        <div style="display:flex;justify-content:space-between;font-size:12.5px;color:#94A3B8;border-top:1px solid #E2E8F0;padding-top:12px;">
          <span style="font-weight:500;">{{ isChallenge ? `by ${item.creator}` : item.org }}</span>
          <span>{{ isChallenge ? `${item.joined.toLocaleString()} joined` : `${item.joined}/${item.spots} spots` }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { CAT_COLOR } from '~/stores/app'
import { useStars } from '~/composables/useStars'

const props = defineProps<{ item: any }>()
const stars = useStars

const isChallenge = computed(() => props.item.type === 'challenge')
const cardLink    = computed(() => isChallenge.value ? `/challenges/${props.item.id}` : `/programs/${props.item.id}`)
const stripeColor = computed(() => isChallenge.value ? '#FF8A65' : (CAT_COLOR[props.item.category] ?? '#2DBAB3'))
</script>
