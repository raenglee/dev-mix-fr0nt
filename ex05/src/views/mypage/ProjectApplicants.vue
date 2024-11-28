<template>
  <div class="w-4/6 mx-auto">
    <div class="pt-10 mb-10">
      <p class="font-bold text-2xl">지원자</p>

      <div class="flex flex-col w-full mb-4">
        <!-- 정렬 필터 -->
        <div class="flex text-sm text-gray-700 gap-2 mb-4 justify-end">
          <p class="cursor-pointer hover:text-gray-500 transition-colors">신청 순</p>
          <i>|</i>
          <p class="cursor-pointer hover:text-gray-500 transition-colors">닉네임 순</p>
          <i>|</i>
          <p class="cursor-pointer hover:text-gray-500 transition-colors">프로젝트 순</p>
        </div>

        <!-- 테이블 -->
        <table class="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
          <thead class="bg-gray-50">
            <tr>
              <th class="border-b text-center p-3 text-gray-800 rounded-tl-lg">신청자</th>
              <th class="border-b text-center p-3 text-gray-800">프로젝트명</th>
              <th class="border-b text-center p-3 text-gray-800">포지션</th>
              <th class="border-b text-center p-3 text-gray-800">내용</th>
              <th class="border-b text-center p-3 text-gray-800">신청날짜</th>
              <th class="border-b text-center p-3 text-gray-800 rounded-tr-lg">승인 여부</th>
            </tr>
          </thead>
          <tbody v-for="(applicant, index) in applicantsarr" :key="applicant.id" class="text-center">
            <tr class="">
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap text-gray-700 cursor-pointer hover:text-gray-400">{{ applicant.userNickname }}</td>
              <RouterLink :to="`/projectview/${applicant.boardId}`">
                <td class="py-3 px-4 text-sm border-b whitespace-nowrap cursor-pointer hover:text-gray-400" @click="goProject">{{ applicant.boardTitle }}</td>
              </RouterLink>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap">{{ applicant.positionName }}</td>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap truncate max-w-[500px] overflow-hidden cursor-pointer hover:text-gray-400">{{ applicant.applyNote }}</td>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap">{{ applicant.applyDate }}</td>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap text-gray-400">{{ applicant.participationStatus }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getApplicants } from '@/api/projectApi';
import { useUserStore } from '@/store/userStore';
import { ref, watchEffect } from 'vue';

// user_id 가져오기
const useStore = useUserStore();
const applicantsarr = ref([]);

const applicants = async () => {
  try {
    const res = await getApplicants(useStore.userId);
    // console.log(useStore.userId);
    // console.log('지원자리스트 확인: ', res.data);

    // 데이터 구조 확인 후, applicantsarr에 할당
    if (Array.isArray(res.data.result)) {
      applicantsarr.value = res.data.result;
    } else {
      // console.error('지원자 res, data, result 확인해보기: ', res);
    }
  } catch (error) {
    // console.error('지원자 가져오기 에러: ', error);
  }
};

watchEffect(() => {
  applicants();
});
</script>

<style lang="scss" scoped></style>
