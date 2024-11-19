<template>
  <div class="m-auto w-full">
    <p class="text-lg font-bold mb-4">받은 신청</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
      <div class="cursor-pointer border rounded-2xl p-4 relative project-card">
        <div class="top-4 flex items-center justify-between">
          <div class="border px-2 rounded-full mb-2 bg-gray-200 text-gray-800">지역</div>
          <!-- <font-awesome-icon
                  :icon="item.isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']"
                  :class="[item.isBookmarked ? 'text-[#7371fc]' : 'text-gray-400', 'cursor-pointer']"
                  style="font-size: 22px"
                  @click.stop="toggleBookmark(item)"
                /> -->
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

    <!--2번째글-->
    <p class="text-lg font-bold my-4">보낸 신청</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
      <div class="cursor-pointer border rounded-2xl p-4 relative project-card">
        <div class="top-4 flex items-center justify-between">
          <div class="border px-2 rounded-full mb-2 bg-gray-200 text-gray-800">지역</div>
          <!-- <font-awesome-icon
                  :icon="item.isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']"
                  :class="[item.isBookmarked ? 'text-[#7371fc]' : 'text-gray-400', 'cursor-pointer']"
                  style="font-size: 22px"
                  @click.stop="toggleBookmark(item)"
                /> -->
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
