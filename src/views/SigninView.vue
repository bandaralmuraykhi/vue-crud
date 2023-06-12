<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted, ref , reactive , defineProps } from 'vue'

const router = useRouter()
const user = useUserStore()

let form = ref({})


async function signin(){
  let   email = form.value.email
  let password=  form.value.password

  try {
    await user.login(email, password)
    router.push('/')
  } catch (err) {
    console.log("error!", err)
  }
}

</script>

<template>
  <div class="container">
    <h1 class="mt-5">Sign in</h1>
    <form @submit.prevent="signin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="form.email" type="text" class="form-control" id="email">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password" type="text" class="form-control" id="password">
        </div>
        <div class="mb-3">
        <button type="submit" class="btn btn-primary">Sign-in</button>
        {{ form }}
      </div>
      </form>
  </div>

</template>

<style>
</style>
