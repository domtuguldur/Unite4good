<template>
  <div class="vm-page" style="text-align:center;padding-top:80px;">
    <h1 class="serif" style="font-size:52px;margin-bottom:16px;">404</h1>
    <p style="color:#64748B;margin-bottom:24px;font-size:16px;">This page doesn't exist.</p>
    <NuxtLink to="/" class="vm-btn vm-btn-primary">Go Home</NuxtLink>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })
</script>
