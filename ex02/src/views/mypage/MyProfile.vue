<template>
  <!--😀개인 정보-->
  <div class="m-auto w-full flex flex-col">
    <div class="m-auto flex flex-col justify-center text-center border border-gray-200 p-3 mb-2 w-full rounded-xl">
      <img class="h-20 w-20 m-auto" src="/img/people.png" />
      <p>{{ useStore.nickname }}님</p>
      <p class="text-sm text-gray-400">{{ useStore.email }}</p>
      <div class="flex justify-center text-center py-3">
        <RouterLink to="/myprofileedit"><button class="border border-gray-300 rounded-md py-1 px-3 mx-1">프로필 수정</button></RouterLink>
        <button class="border border-gray-300 rounded-md py-1 px-2">공유</button>
      </div>
    </div>
    <div class="flex flex-col justify-center text-center">
      <h2 class="font-bold text-xl">소속</h2>
      <p class="py-2">소속data</p>
      <h2 class="font-bold text-xl">포지션</h2>
      <p class="py-2">포지션data</p>
      <h3 class="font-bold text-xl">지역</h3>
      <p class="py-2">지역data</p>
      <h2 class="font-bold text-xl">기술 스택</h2>
      <p class="py-2">기술 스택data</p>
    </div>
    <div class="flex justify-end mt-auto mb-5">
      <p class="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">회원탈퇴</p>
    </div>
    <!--😀개인 정보 끝-->
  </div>
</template>

<script setup>
import { getPositions, getTechstacks } from '@/api/projectApi';
import { loginUsers } from '@/api/loginApi';
import { userInfo } from '@/api/userApi';
import { ref, watchEffect } from 'vue';
import { useUserStore } from '@/store/userStore';

const useStore = useUserStore();
const userProfile = ref(null);

// 사용자 정보 API 호출
const loadUserProfile = async () => {
  try {
    const profile = await loginUsers(); // API로부터 사용자 프로필 정보 가져오기
    userProfile.value = profile.data; // API에서 받은 데이터를 userProfile에 저장
  } catch (error) {
    console.error('프로필 정보를 불러오는 데 실패했습니다.', error);
  }
};

const getProfileImageUrl = (profileImage) => {
  if (!profileImage) return '';  // 프로필 이미지가 없으면 빈 문자열 반환
  
  // 파일명과 MIME 타입을 분리
  const fileName = useStore.profileImage
  
  // 실제 이미지 URL을 반환 (서버에서 이미지 URL을 반환하는 방식에 맞게 처리)
  // 예: 서버 URL로 변경 또는 Blob URL 생성 (여기서는 예시로 'images/' 경로를 사용)
  return `http://localhost:8080/file/images/${fileName}`;
}

// 포지션 데이터 가져오기
const positionOptions = ref([]);
// 기술/언어 데이터 가져오기
const techOptions = ref([]);

const selectPositions = async () => {
  try {
    const res = await getPositions();
    // console.log('updatePsotions 데이터 확인: ', res);
    if (Array.isArray(res.data.result)) {
      positionOptions.value = res.data.result;
    } else {
      console.error('분야별 모집 인원 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

const selelctTechstacks = async () => {
  try {
    const res = await getTechstacks();
    // console.log('updateTechstacks 데이터 확인: ', res);
    // techOptions.value = res.result;
    if (Array.isArray(res.data.result)) {
      techOptions.value = res.data.result.map((item) => ({
        techStackName: item.techStackName,
        imageUrl: item.imageUrl
      }));
    } else {
      console.error('기술/언어 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

watchEffect(() => {
  loadUserProfile();
  selectPositions();
  selelctTechstacks();
});

</script>

<style lang="scss" scoped></style>
