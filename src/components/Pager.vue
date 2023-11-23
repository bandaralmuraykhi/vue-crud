<script setup>
import {  ref , watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()

const props = defineProps({
  count: {
    type: Number,
    required: true
  }
})

let pages = ref([])

function updatePages() {
  let page = route.query.page 
    if (page === undefined) {
      page = 1
    }
    let pageSize = 3
    let maxPage = Math.ceil(props.count/pageSize)
    pages.value = [...Array(maxPage).keys()].map(i=> i+1)
}

watch(()=> props.count, updatePages)

</script>

<template>
<nav aria-label="...">
  <ul class="pagination pagination">
    <li class="page-item" v-for="page in pages">
      <RouterLink class="page-link" :to="`?page=${page}`">{{ page }}</RouterLink>
    </li>
  </ul>
</nav>
</template>
