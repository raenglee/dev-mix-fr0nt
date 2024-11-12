<script setup>
import { RouterView } from 'vue-router';
import LayoutHeader from '@/views/header/Headerlayout.vue';
import Footerlayout from './views/header/Footerlayout.vue';
// import LayoutHeadercopy from '@/views/header/RedHeader copy.vue';
</script>

<template>
  <!-- <LayoutHeadercopy /> -->
  <!--로그인 안하고 로그인한상태의 헤더 보는 법-->
  <LayoutHeader />
  <RouterView />
  <Footerlayout/>
  
</template>

<style scoped></style>
