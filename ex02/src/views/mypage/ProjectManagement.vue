<template>
  <div class="m-auto w-full">
    <p class="text-lg font-bold mb-4">내가 작성한 프로젝트</p>
    <div class="mx-2">
      <div class="flex flex-col gap-4">
        <!-- 전체 선택 버튼 -->
        <div class="flex justify-between">
          <button type="button" class="border border-gray-400 w-12 rounded-full text-sm" @click="toggleAllCheckboxes">전체</button>
          <button type="button" class="border border-gray-400 w-12 rounded-full text-sm">삭제</button>
        </div>

        <div class=" p-3">
          <!--글내용-->
          <div class="flex items-center justify-between w-full">
            <div class="flex gap-3 items-center w-full">
              <input type="checkbox" class="form-checkbox" />
              <!-- 내용 텍스트, 말줄임표 적용 -->
              <div class="flex flex-col">
                <p class="text-sm text-gray-700 mb-1">작성 YYYY.MM.DD</p>
                <div class="flex">
                  <div class="bg-gray-200 rounded-full px-2 min-w-12 mr-2">지역</div>
                  <p class="text-gray-700 w-full truncate max-w-[500px] whitespace-nowrap overflow-hidden">[모집합니다] 제목</p>
                </div>
              </div>
            </div>
            <!-- 수정 삭제를 오른쪽 끝에 위치시키기 -->
            <div class="flex gap-2 text-center justify-center item-center text-sm">
              <p class="flex-shrink-0">수정</p>
              <p class="flex-shrink-0">삭제</p>
            </div>
          </div>
          <div class="my-4">
            <hr class="border-t-1 border-gray-300" />
          </div>

          <!--글내용2 반복 적용되면 지우기-->
          <div class="flex items-center justify-between w-full">
            <div class="flex gap-3 items-center w-full">
              <input type="checkbox" class="form-checkbox" />
              <div class="flex flex-col">
                <p class="text-sm text-gray-700 mb-1">작성 YYYY.MM.DD</p>
                <div class="flex">
                  <div class="bg-gray-200 rounded-full px-2 min-w-12 mr-2">지역</div>
                  <p class="text-gray-700 w-full truncate max-w-[500px] whitespace-nowrap overflow-hidden">[모집합니다] 제목</p>
                </div>
              </div>
            </div>
            <div class="flex gap-2 text-center justify-center item-center text-sm">
              <p class="flex-shrink-0">수정</p>
              <p class="flex-shrink-0">삭제</p>
            </div>
          </div>
          <div class="my-4">
            <hr class="border-t-1 border-gray-300" />
          </div>
          <!--글내용2 반복 적용되면 지우기-->
        </div>
      </div>
    </div>
    <!-- <div class="my-4">
      <hr class="border-t-1 border-gray-300" />
    </div> -->
    <p class="my-4 text-lg font-bold">내가 참여 중인 프로젝트</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
      <div class="cursor-pointer border rounded-2xl p-4 relative project-card">
        <div class="top-4 flex items-center justify-between">
          <div class="border px-2 rounded-full mb-2 bg-gray-200 text-gray-800">지역</div>
        </div>
        <div class="text-sm mb-2 text-gray-800">모집 마감일 |</div>
        <div class="text-xl font-bold mb-2 text-gray-800">제목</div>
        <!--기술 아이콘-->
        <div class="flex pt-2 gap-3 mb-1">
          <div>
            <!-- <img class="w-10 h-10" :src="tech.techStackImageUrl" /> -->
          </div>
        </div>
        <div class="flex flex-col">
          <p class="flex-grow text-right text-sm py-2 text-gray-800">작성자</p>
          <!-- <p class="flex-grow text-right text-sm py-2" v-else>&nbsp;</p> -->
          <div class="flex justify-between items-center mt-3">
            <!-- 인원 정보 (0 / 총 인원) -->
            <div class="relative group">
              <!-- 인원 0 / 총 인원 표시 -->
              <div class="text-sm cursor-pointer text-gray-800">인원 남은 / 총인원</div>
              <!-- 개별 인원 수 출력, 마우스를 올리면 나타나도록 -->
              <div
                class="absolute z-10 bg-white left-14 bottom-2 p-2 shadow-lg rounded-xl mt-2 w-auto whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300"
              >
                <div class="text-sm my-1 m-auto"><span class="font-bold rounded-md px-1 text-gray-800"> 포지션명 -</span>요구인원수명</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
