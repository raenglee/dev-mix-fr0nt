<template>
  <div class="m-auto w-full">
    <p class="text-lg font-bold my-4">보낸 신청</p>

    <div v-if="myAppliesarr.length === 0" class="text-center text-gray-500 py-8" style="height: 100px">작성한 신청이 없습니다.</div>

    <div v-for="(myApplies, index) in myAppliesarr" :key="index">
      <div class="flex items-center justify-between w-full mb-2">
        <div class="top-4 flex items-center justify-between">
          <div class="border px-2 rounded-full mb-2 bg-gray-200 text-gray-800 min-w-20 text-center mr-2">읽음</div>
        </div>
        <div class="flex gap-2 items-center w-full">
          <!-- 댓글내용 텍스트, 말줄임표 적용 -->
          <div class="flex flex-col w-full">
            <p class="text-sm text-gray-600">지원날짜 {{ myApplies.applyDate }}</p>
            <p class="cursor-pointer text-gray-700 w-full truncate max-w-[500px] whitespace-nowrap overflow-hidden" @click="openModal(applicant)">
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

   <!--지원 모달-->
   <div v-if="showModal" class="modal-container" @click.self="closeModal">
        <div class="modal-content">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-xl text-center">지원 상세 내용</h2>
            <button class="h-4 w-4" @click="closeModal"><img src="/img/x.png" /></button>
          </div>
          <div class="flex flex-col mb-4 gap-2">
            <p class="font-bold">지원 직군</p>
            <p class="text-sm bg-gray-100 rounded-lg p-4">{{ myApplies.positionName }}</p>
            <p class="font-bold">지원 사유 및 한마디</p>
            <p class="text-sm bg-gray-100 rounded-lg p-4">{{ myApplies.applyNote }}</p>
          </div>
          <div class="flex justify-center gap-3 mb-4">
            <button type="button" class="border border-gray-300 bg-gray-300 rounded-full py-1 px-3" @click="closeModal">거절</button>
            <button type="submit" class="border border-[#d10000] bg-[#d10000] text-white rounded-full py-1 px-3" @click="admit">승인</button>
          </div>

          <p class="text-center text-sm text-gray-500 mb-3">승인을 누르시면, 해당 지원자는 정식으로 프로젝트 참가자가 됩니다.</p>
          <!-- <h3 class="text-sm text-gray-700 font-bold mb-2">유의사항</h3>
          <ul class="text-xs text-gray-400 flex flex-col gap-1">
            <li>프로젝트에게 가입하신 이메일 정보에 제공됩니다.</li>
            <li>프로젝트에서 작업한 저작권에 프로젝트에 귀속됩니다.</li>
            <li>프로젝트 분쟁사항은 데브믹스에서 책임지지 않습니다.</li>
            <li>리더가 14일동안 승인하지 않으면 자동 취소됩니다.</li>
          </ul> -->
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

// 지원자 지원내용 상세 정보 모달
const openModal = (applicant) => {
  myAppliesarr.value = applicant; // 클릭한 지원자 정보를 모달에 전달
  showModal.value = true;
};

watchEffect(() => {
  myApplies();
});
</script>

<style lang="scss" scoped></style>
