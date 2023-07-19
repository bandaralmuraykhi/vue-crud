<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref , reactive} from 'vue'
import { supabase } from '@/supabase'


const router = useRouter()

let form = reactive({})

async function addBook() {
  const { data, error } = await supabase
    .from('books')
    .insert([
      { title: form.title, 
        pages: form.pages
      },
    ])
    router.push('/list')
}
</script>

<template>
  <main>
    <h1>Add</h1>
    {{ form }}
    <form @submit.prevent="addBook">
      Title: <br> <input v-model="form.title"> <br>
      Pages: <br> <input v-model="form.pages"> <br>
      <button type="submit" class="btn btn-primary btn-sm" >Add</button>
    </form>
  </main>
</template>
