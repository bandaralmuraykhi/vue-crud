import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/supabase'


export const useUserStore = defineStore('user', () => {
  const user = ref('')
  const isAuthenticated = computed(() => user.value !== '')

  async function login(email, password) {
    let { data, error } = await supabase.auth.signInWithPassword({email, password})  
    if(error === null) {
      user.value = email
    } else {
      throw "invaild username or password"
    }
    console.log(error)
  }

  async function SignUp(email, password) {
    let { data, error } = await supabase.auth.signUp({email, password})
    console.log(error)
    if(error === null) {
      throw "Done!"
    } else {
      throw "invaild username or password"
    }
  }

  async function logout() {
    let { error } = await supabase.auth.signOut()
    user.value = ''
  }

  return { user, login, logout, isAuthenticated, SignUp }
})
