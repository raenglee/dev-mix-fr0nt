<template>
  <div class="m-auto w-full">
    <p class="text-lg font-bold my-4">보낸 신청</p>

    <!-- <div v-if="myAppliesarr.length === 0" class="text-center text-gray-500 py-8" style="height: 100px">작성한 글이 없습니다.</div> -->

    <div v-for="(myApplies, index) in myAppliesarr" :key="index">
      <div class="flex items-center justify-between w-full mb-2">
        <div class="top-4 flex items-center justify-between">
          <div class="border px-2 rounded-full mb-2 bg-gray-200 text-gray-800 min-w-20 text-center mr-2">읽음</div>
        </div>
        <div class="flex gap-2 items-center w-full">
          <!-- 댓글내용 텍스트, 말줄임표 적용 -->
          <div class="flex flex-col w-full">
            <p class="text-sm text-gray-600">지원날짜 {{ myApplies.applyDate }}</p>
            <p class="cursor-pointer text-gray-700 w-full truncate max-w-[500px] whitespace-nowrap overflow-hidden">
              <span class="font-bold text-gray-700">[{{ myApplies.positionName }}]</span> {{ myApplies.note }}
            </p>
            <p class="text-sm text-gray-500 cursor-pointer">{{ myApplies.boardTitle }}</p>
          </div>
        </div>

        <!-- 작성일, 수정, 삭제를 오른쪽 끝에 위치시키기 -->
        <div class="flex gap-3 text-center justify-end items-center text-sm">
          <p class="whitespace-nowrap">지원상태 {{ myApplies.participationStatus }}</p>
          <p class="flex-shrink-0 text-gray-500 cursor-pointer hover:text-gray-800">신청 취소</p>
        </div>
      </div>
      <div>
        <hr class="border-t border-gray-200" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getMyApplies } from '@/api/applyApi';
import { useUserStore } from '@/store/userStore';
import { ref, watchEffect } from 'vue';

const useStore = useUserStore();
const myAppliesarr = ref([]);

// 내가 지원한 정보 Api
const myApplies = async () => {
  try {
    const res = await getMyApplies(useStore.userId);
    // console.log(useStore.userId);
    console.log('지원한 내용들', res.data.result);
    if (Array.isArray(res.data.result)) {
      myAppliesarr.value = res.data.result;
    } else {
      console.error('지원자 res, data, result 확인해보기: ', res);
    }
  } catch (error) {
    console.error('지원자 가져오기 에러: ', error);
  }
};

watchEffect(() => {
  myApplies();
});
</script>

<style lang="scss" scoped></style>
