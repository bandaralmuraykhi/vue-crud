<script setup>
import { onMounted, ref, watch } from 'vue'
import { supabase } from '@/supabase'
import { useRouter, useRoute } from 'vue-router'
import Pager from '@/components/Pager.vue'

const router = useRouter()
const route = useRoute()

let books = ref([])
let total = ref(0)
let pages = ref([])
let status = ref('')

async function fetchData() {
    status.value = 'loading...'
    let page = route.query.page 
    if (page === undefined) {
      page = 1
    }
    let pageSize = 3
    let start = (page - 1) * pageSize
    let end = (start + pageSize - 1) 
    // get count 
    let { count } = await supabase
        .from('books')
        .select('*', { count:'exact', head: true})
    total.value = count
    let maxPage = Math.ceil(count/pageSize)
    pages.value = [...Array(maxPage).keys()].map(i=> i+1)
    // get data
    let { data, error } = await supabase
        .from('books')
        .select('*')
        .range(start,end)
    console.log(error)
    books.value = data
    status.value = ''
}

async function deleteBook(id) {
    const { data, error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)
    fetchData()
}

onMounted(() => fetchData())

watch(()=>route.query, fetchData)
</script>

<template>
  <main>
    <h1>List</h1>
    <button class="btn btn-primary btn-sm" @click="router.push('/add')">Add</button>
    {{ status }}
    <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th class="th-sm">Title</th>
      <th class="th-sm">Pages</th>
      <th class="th-sm">Edit</th>
      <th class="th-sm">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="book in books">
      <td>{{ book.title }}</td>
      <td>{{ book.pages }}</td>
      <td><button type="button" class="btn btn-primary btn-sm" @click="router.push({ name: 'edit', params: { id: book.id } })">Edit</button></td>
      <td><button type="button" class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Delete</button></td>
    </tr>
  </tbody>
</table>

 
<Pager :count="total"/>

<!-- 
  v-for="count in total" 
-->





</main>


</template>
