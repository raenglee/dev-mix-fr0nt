<template>
  <!--😀개인 정보-->
  <div class="m-auto w-full flex flex-col">
    <div class="m-auto flex flex-col justify-center text-center border border-gray-200 p-3 mb-2 w-full rounded-xl">
      <img v-if="useStore.profileImage" :src="useStore.profileImage" class="h-20 w-20 m-auto" />
      <!-- <img class="h-20 w-20 m-auto" /> -->

      <p>{{ useStore.nickname }}님</p>
      <p>{{ useStore.email }}</p>
      <div class="flex justify-center text-center py-3">
        <button class="border border-gray-300 rounded-md py-1 px-2">공유</button>
      </div>
    </div>
    <div class="flex flex-col justify-center text-center">
      <h2 class="font-bold text-xl">소속</h2>
      <div class="py-2">{{ useStore.groupName }}</div>
      <h2 class="font-bold text-xl">포지션</h2>
      <!-- <li class="py-2" v-for="user in useStore.data" :key="user.id">
        {{ data.positionList }}
      </li> -->
      <h3 class="font-bold text-xl">지역</h3>
      <div class="py-2">{{ useStore.location }}</div>
      <h2 class="font-bold text-xl">기술 스택</h2>
      <li class="py-2" v-for="tech in techStacks" :key="tech">
                  <img :src="tech.imageUrl" class="w-10 h-10" />
                  <span class="text-sm py-4">{{ tech.techStackName }}</span>
            </li>
    </div>
    <!--😀개인 정보 끝-->
  </div>
 <!-- 팝업이 열리면 router-view를 숨기도록 설정 -->
 <router-view v-if="!isPopupOpen"></router-view>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';


const useStore = useUserStore();
const techStacks = ref([]);
const positions = ref([]);

</script>
