<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref , reactive , defineProps } from 'vue'
import { supabase } from '@/supabase'
const router = useRouter()
const props = defineProps(['id'])
let status = ref('')
let form = ref({})

async function saveBook() {
  const { data, error } = await supabase
    .from('books')
    .update(
      { title: form.value.title, 
        pages: form.value.pages,
      },
    )
    .eq('id', props.id)
    router.push('/list')
}

async function fetchData() {
    status.value = 'loading...'
    let { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', props.id)
    console.log(data[0])
    form.value = data[0]
    status.value = ''
}

onMounted(() => fetchData())

</script>

<template>
  <main>
    <h1>Edit {{ id }}</h1>
    <form @submit.prevent="saveBook">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input v-model="form.title" type="text" class="form-control" id="title">
      </div>
      <div class="mb-3">
        <label for="pages" class="form-label">Pages</label>
        <input v-model="form.pages" type="int" class="form-control" id="pages">
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>

  </main>
</template>
