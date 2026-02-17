<script setup lang="ts">
import { VPBadge } from 'vitepress/theme'

defineProps<{
  version: string
}>()
</script>

<template>
  <a :href="`/version/releasenotes`">
    <VPBadge type="info" :text="version" class="badge"/>
  </a>
</template>

<style scoped>
a {
  padding: 0 12px;
  & .badge{
    text-decoration: underline;
  }
  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }
}
</style>
