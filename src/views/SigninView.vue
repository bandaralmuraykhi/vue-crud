<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted, ref , reactive , defineProps } from 'vue'
import { supabase } from '@/supabase'

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

async function signup(){
  let   email = form.value.email
  let password =  form.value.password
  let { data, error } = await supabase.auth.signUp({
  email: email,
  password: password
  })
  console.log(error)
}

</script>

<template>
  <div class="container">
    <h1 class="mt-5">Sign in</h1>
    <form>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="form.email" type="text" class="form-control" id="email">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password" type="text" class="form-control" id="password">
        </div>
        <div class="mb-3">
          <button @click.prevent="signin" type="submit" class="btn btn-primary">Sign-in</button>
          .
          <button @click.prevent="signup" type="submit" class="btn btn-primary">Sign-up</button>
        </div>
      </form>
  </div>
</template>

<style>
</style>
