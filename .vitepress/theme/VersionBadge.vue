<script setup lang="ts">
import { useData } from 'vitepress'
import { cliVersion } from '../cli-version'

const { page } = useData()
</script>

<template>
  <p v-if="page.relativePath.startsWith('guide/')" class="cli-version-badge">
    Documented CLI version <strong>{{ cliVersion }}</strong>
  </p>
</template>
