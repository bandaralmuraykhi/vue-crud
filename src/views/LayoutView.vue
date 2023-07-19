<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const user = useUserStore()


async function logout() {
  await user.logout()
  router.push('/sign-in')
}

</script>






<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container-fluid">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/list" class="nav-link" >List</RouterLink>
      </li>
    </ul>
    {{ user.user }}
    <button @click="logout" class="btn btn-primary">Logout</button>
  </div>
</div>
</nav>



<div class="container-fluid">
  <RouterView />
</div>




<footer id="footer">Bandar &copy;</footer>


</template>




<style scoped>
#footer {
  text-align: center;
}
</style>