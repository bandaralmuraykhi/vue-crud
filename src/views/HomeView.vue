<script setup>
import { useUserStore } from '@/stores/user'

const user = useUserStore()

</script>

<template>
  <main>
    <h1> Welcome to my website</h1>
    {{ user.user }}
  </main>
</template>
