<template>
  <!--🔴헤더-->
  <header>
    <div class="p-3 bg-[#d10000]">
      <nav class="flex space-x-5 justify-between items-center m-auto w-4/6">
        <div>
          <RouterLink to="/" class="text-3xl text-white font-bold">DEVMIX</RouterLink>
        </div>

        <!--🌐로그인 한 후 아이콘-->
        <template v-if="useStore.loginCheck">
          <div class="flex flex-wrap space-x-1">
            <div class="relative" @mouseenter="openAlarmDropdown" @mouseleave="closeAlarmDropdown">
              <!-- <font-awesome-icon
                icon="bell"
                class="h-6 w-5 cursor-pointer p-2"
                :class="{
                  'text-[#d10000] bg-white': isAlarmDropdownOpen,
                  'text-white hover:bg-[#ffffff] hover:text-[#d10000]': !isAlarmDropdownOpen
                }"
              /> -->
              <p
                class="px-3 py-1 whitespace-nowrap rounded-md font-bold cursor-pointer"
                @mouseenter="isAlarmHovered = true"
                @mouseleave="isAlarmHovered = false"
                :class="{
                  'text-[#d10000] bg-red-50': isAlarmHovered,
                  'text-white': !isAlarmHovered
                }"
              >
                알람
              </p>
              <!-- 알람 드롭다운 메뉴 -->
              <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div
                  v-if="isAlarmDropdownOpen"
                  @mouseenter="isAlarmHovered = true"
                  @mouseleave="isAlarmHovered = false"
                  class="absolute right-0 top-6 w-max min-w-[150px] max-w-[400px] bg-red-50 rounded-md z-10 shadow-[0_4px_3px_0_rgba(0,0,0,0.1)]"
                >
                  <ul class="text-sm mt-2">
                    <li>
                      <p class="px-4 py-2">지원자 신청이 도착하였습니다.</p>
                    </li>
                    <li>
                      <p class="px-4 py-2">[....]에 댓글이 작성되었습니다.</p>
                    </li>
                    <li>
                      <p class="px-4 py-2">지원자 신청이 도착하였습니다.</p>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>

            <RouterLink to="/projectcreate" class="px-3 py-1 whitespace-nowrap rounded-md font-bold cursor-pointer text-white"> 글쓰기 </RouterLink>
            <div class="relative" @mouseenter="openPeopleDropdown" @mouseleave="closePeopleDropdown">
              <p
                class="px-3 py-1 whitespace-nowrap rounded-md font-bold cursor-pointer"
                @mouseenter="isPeopleHovered = true"
                @mouseleave="isPeopleHovered = false"
                :class="{
                  'text-[#d10000] bg-red-50': isPeopleHovered,
                  'text-white': !isPeopleHovered
                }"
              >
                내정보
              </p>
              <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div
                  v-if="isPeopleDropdownOpen"
                  @mouseenter="isPeopleHovered = true"
                  @mouseleave="isPeopleHovered = false"
                  class="absolute right-0 top-6 w-max min-w-[150px] max-w-[400px] bg-red-50 rounded-md z-10 shadow-[0_4px_3px_0_rgba(0,0,0,0.1)]"
                >
                  <ul class="text-sm">
                    <li>
                      <p class="px-4 py-2 font-bold text-lg">반갑습니다 {{ useStore.nickname }} 님</p>
                    </li>
                    <li>
                      <RouterLink to="/mypage/myprofile" class="block px-4 py-2 text-gray-800 hover:bg-[#d1000020] hover:font-bold"> 마이 페이지 </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/projectapplicants" class="block px-4 py-2 text-gray-800 hover:bg-[#d1000020] hover:font-bold">지원자 확인</RouterLink>
                    </li>
                    <li>
                      <button @click="logout" class="block w-full px-4 py-2 text-gray-800 hover:bg-[#d1000020] text-left hover:font-bold">로그아웃</button>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </template>

        <!--⛔로그인 하기 전 아이콘-->
        <template v-else>
          <div class="flex space-x-5">
            <button class="focus:outline-none" @click.stop="modalLogin('login')">
              <!-- <img src="/img/person.png" class="h-6 w-5" /> -->
              <!-- <font-awesome-icon icon="user" class="h-6 w-5 cursor-pointer text-white" /> -->
              <!-- <font-awesome-icon icon="user" class="h-6 w-5 cursor-pointer p-2 text-white hover:bg-[#ffffff] hover:text-[#d10000]" /> -->
              <p class="px-3 py-1 whitespace-nowrap rounded-md font-bold cursor-pointer text-white">로그인</p>
            </button>
          </div>
        </template>
      </nav>
    </div>
  </header>

  <!-- LoginModal 컴포넌트 -->
  <LoginModal :isModal="isModal" @update:isModal="closeModal" />
</template>

<!--스크립트-->
<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import { loginUsers } from '@/api/loginApi';
import { useUserStore } from '@/store/userStore';
import LoginModal from '@/views/Component/LoginModal.vue';

//모달
const isModal = ref(false);

const modalLogin = async () => {
  isModal.value = !isModal.value;
};

// 모달 닫기 (배경 클릭 시)
const closeModal = () => {
  isModal.value = false;
};

//로그인
const route = useRoute();
const router = useRouter();
const useStore = useUserStore();

watchEffect(async () => {
  if (route.query.token) {
    localStorage.setItem('token', route.query.token);

    try {
      const data = await loginUsers();
      // 닉네임이 없을 경우 /profile로 이동
      if (!data.result.nickname) {
        router.push('/profile');
      } else {
        const userData = data.result; // 예: 서버에서 반환한 사용자 정보 (username, email 등)
        const token = route.query.token; // 예: 서버에서 반환한 토큰

        // 사용자 정보와 토큰을 store에 저장
        useStore.profile(userData);

        // 토큰을 로컬스토리지에 저장 (브라우저 새로 고침 시 토큰을 유지)
        localStorage.setItem('token', token);
        router.push('/'); // 메인 페이지로 이동
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
});

// 드롭다운 상태 관리
const isPeopleDropdownOpen = ref(false);
const isPeopleHovered = ref(false);
const isAlarmDropdownOpen = ref(false);
const isAlarmHovered = ref(false);
// const isapplyDropdownOpen = ref(false);

// 마이페이지 드롭다운 열기
const openPeopleDropdown = () => {
  isPeopleDropdownOpen.value = true;
};

// 마이페이지 드롭다운 닫기
const closePeopleDropdown = () => {
  isPeopleDropdownOpen.value = false;
};

// 알람 드롭다운 열기
const openAlarmDropdown = () => {
  isAlarmDropdownOpen.value = true;
};

// 알람 드롭다운 닫기
const closeAlarmDropdown = () => {
  isAlarmDropdownOpen.value = false;
};

// 로그아웃 함수
const logout = () => {
  localStorage.removeItem('token');
  useStore.logout();
  alert('로그아웃 성공');
  router.push('/');
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isPeopleDropdownOpen.value = false;
  }
};

//드롭다운 애니메이션
// 드롭다운 열리기 전
const beforeEnter = (el) => {
  el.style.transform = 'scaleY(0)';
  el.style.opacity = '0';
  el.style.transformOrigin = 'top';
};

// 드롭다운 열리는 동안
const enter = (el, done) => {
  el.offsetHeight;
  el.style.transition = 'transform 0.3s ease-out, opacity 0.2s ease-out';
  el.style.transform = 'scaleY(1)';
  el.style.opacity = '1';
  done();
};

// 드롭다운 닫히는 동안
const leave = (el, done) => {
  el.style.transition = 'transform 0.3s ease-in, opacity 0.2s ease-in';
  el.style.transform = 'scaleY(0)';
  el.style.opacity = '0';
  done();
};

watchEffect(() => {
  window.addEventListener('click', handleClickOutside);
});
</script>

<!--스타일-->
<style scoped></style>
