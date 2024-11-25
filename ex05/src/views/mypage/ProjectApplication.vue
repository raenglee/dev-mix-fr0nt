<template>
  <div class="m-auto w-full">
   

    <!--보낸 신청-->
    <p class="text-lg font-bold my-4 mt-10">보낸 신청</p>

    <!-- <div v-if="boardsarr.length === 0" class="text-center text-gray-500 py-8" style="height: 100px;">작성한 글이 없습니다.</div> -->

    <div class="flex items-center justify-between w-full mb-2">
      <div class="top-4 flex items-center justify-between">
        <div class="border px-2 rounded-full mb-2 bg-gray-200 text-gray-800 min-w-20 text-center mr-2">읽음</div>
      </div>
      <div class="flex gap-2 items-center w-full">
        <!-- 댓글내용 텍스트, 말줄임표 적용 -->
        <div class="flex flex-col w-full">
          <p class="text-sm text-gray-600">지원날짜 2024.11.26</p>
          <p class="cursor-pointer text-gray-700 w-full truncate max-w-[500px] whitespace-nowrap overflow-hidden"><span class="font-bold text-gray-700">[신청한 포지션]</span> 신청한 내용</p>
          <p class="text-sm text-gray-500 cursor-pointer">신청한 글 제목</p>
        </div>
      </div>

      <!-- 작성일, 수정, 삭제를 오른쪽 끝에 위치시키기 -->
      <div class="flex gap-3 text-center justify-end items-center text-sm">
        <p class="flex-shrink-0 text-gray-500 cursor-pointer hover:text-gray-800">신청 취소</p>
      </div>
    </div>
    <div>
      <hr class="border-t border-gray-200" />
    </div>
  </div>
</template>

<script setup>
import { getPositions, getTechstacks } from '@/api/projectApi';
import { ref, watchEffect } from 'vue';

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
  selectPositions();
  selelctTechstacks();
});
</script>

<style lang="scss" scoped></style>
