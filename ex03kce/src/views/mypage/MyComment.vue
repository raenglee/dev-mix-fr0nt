<template>
  <div class="m-auto w-full">
  <div class="pt-7 px-2">
    <div class="flex flex-col space-x-1 space-y-4">
      <!-- 전체 선택 버튼 -->
      <div class="flex justify-between">
        <button type="button" class="border border-gray-400 w-12 rounded-full text-sm" @click="toggleAllCheckboxes">전체</button>
        <button type="button" class="border border-gray-400 w-12 rounded-full text-sm">삭제</button>
      </div>

      <!-- 댓글 내용 반복 -->
      <div v-for="(comment, index) in comments" :key="index" class="flex flex-col space-y-1">
        <div class="flex items-center justify-between w-full">
          <div class="flex gap-3 items-center w-full">
            <!-- 각 체크박스의 상태를 v-model로 바인딩 -->
            <input type="checkbox" v-model="checkboxes[index]" class="form-checkbox" />
            <!-- 댓글내용 텍스트, 말줄임표 적용 -->
            <p class="text-gray-700 w-full truncate max-w-[500px] whitespace-nowrap overflow-hidden">
              {{ comment.text }}
            </p>
          </div>
          <!-- 작성일을 오른쪽 끝에 위치시키기 -->
          <div class="text-sm text-gray-500 flex-shrink-0">{{ comment.createdDate }}</div>
        </div>

        <p class="text-sm px-6 text-gray-500">글 제목</p>
        <div class="mt-2"><hr class="border-t border-gray-300 mt-2 mb-2" /></div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

// 댓글 데이터 배열
const comments = ref([
  { text: '댓글내용addddddddddddddddddddddddddddddsfafafsaffasfsafsafaffsfsa', createdDate: '2024-11-01' },
  { text: '두 번째 댓글내용이 여기에 옵니다', createdDate: '2024-11-02' },
  { text: '세 번째 댓글이 여기에 옵니다', createdDate: '2024-11-03' }
]);

// 체크박스 상태를 관리하는 배열 (댓글 수만큼 체크박스)
const checkboxes = ref(new Array(comments.value.length).fill(false));

const toggleAllCheckboxes = () => {
  // 모든 체크박스가 true인지 확인 (모두 선택되어 있는지)
  const allChecked = checkboxes.value.every((checkbox) => checkbox); // 모든 체크박스가 선택된 상태인지 확인
  // 모든 체크박스가 true라면 false로, false라면 true로 반전시킴
  checkboxes.value = checkboxes.value.map(() => !allChecked);
};
</script>

<style scoped>
/* 스타일을 필요에 맞게 추가할 수 있습니다. */
</style>
