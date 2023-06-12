<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '@/supabase'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

let books = ref([])
let status = ref('')

async function fetchData() {
    status.value = 'loading...'
    let { data, error } = await supabase
        .from('books')
        .select('*')
    books.value = data
    status.value = ''
}

async function deleteBook(id) {
    console.log(`delete ${id}`)
    const { data, error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)
    fetchData()
}

onMounted(() => fetchData())

</script>

<template>
  <main>
    <h1>List</h1>
    {{ status }}
    <table class="table table-striped table-sm">
        <thead>
            <th scope="col">Title</th>
            <th scope="col">Pages</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
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


    <button @click="router.push('/add')">Add</button>
  </main>
</template>
