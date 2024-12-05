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

          <!-- 지원자가 없는 경우 -->
          <tbody v-if="applicantsarr.length === 0">
            <tr>
              <td colspan="6" class="text-center text-gray-500 py-8">
                <div class="flex items-center justify-center w-full">프로젝트 지원자가 없습니다.</div>
              </td>
            </tr>
          </tbody>

          <tbody v-for="(applicant, index) in applicantsarr" :key="applicant.id" class="text-center">
            <tr>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap text-gray-700 cursor-pointer hover:text-gray-400">{{ applicant.userNickname }}</td>
              <RouterLink :to="`/projectview/${applicant.boardId}`">
                <td class="py-3 px-4 text-sm border-b whitespace-nowrap cursor-pointer hover:text-gray-400" @click="goProject" style="display: block">{{ applicant.boardTitle }}</td>
              </RouterLink>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap">{{ applicant.positionName }}</td>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap truncate max-w-[500px] overflow-hidden cursor-pointer hover:text-gray-400" @click="openModal(applicant)">
                {{ applicant.applyNote }}
              </td>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap">{{ applicant.applyDate }}</td>
              <td class="py-3 px-4 text-sm border-b whitespace-nowrap text-gray-400">{{ applicant.participationStatus }}</td>
            </tr>
          </tbody>
        </table>
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
            <p class="text-sm bg-gray-100 rounded-lg p-4">{{ selectedApplicant?.positionName }}</p>
            <p class="font-bold">지원 사유 및 한마디</p>
            <p class="text-sm bg-gray-100 rounded-lg p-4">{{ selectedApplicant?.applyNote }}</p>
          </div>
          <div class="flex justify-center gap-3 mb-4">
            <button type="button" class="border border-gray-300 bg-gray-300 rounded-full py-1 px-3" @click="reject">거절</button>
            <button type="submit" class="border border-[#d10000] bg-[#d10000] text-white rounded-full py-1 px-3" @click="admit">승인</button>
          </div>

          <p class="text-center text-sm text-gray-500 mb-3">승인을 누르시면, 해당 지원자는 정식으로 프로젝트 참가자가 됩니다.</p>
        </div>
      </div>

      <!-- 승인대기 모달
      <div v-if="isConfirmModal" class="modal-container" @click.self="closeConfirmModal">
        <div class="modal-content">
          <h2 class="modal-title">지원이 완료되었습니다!</h2>
          <p>작성자가 승인하면 프로젝트에 참가하게 됩니다.</p>
          <button @click="closeConfirmModal">확인</button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { admitApplicants, getApplicants } from '@/api/applyApi';
import { useUserStore } from '@/store/userStore';
import { ref, watchEffect } from 'vue';

// user_id 가져오기
const useStore = useUserStore();
const applicantsarr = ref([]);

// 지원자 정보 Api
const applicants = async () => {
  try {
    const res = await getApplicants(useStore.userId);
    // console.log(useStore.userId);
    // console.log('지원자리스트 확인: ', res.data);

    // 데이터 구조 확인 후, applicantsarr에 할당
    if (Array.isArray(res.data.result)) {
      applicantsarr.value = res.data.result;
    } else {
      console.error('지원자 res, data, result 확인해보기: ', res);
    }
  } catch (error) {
    console.error('지원자 가져오기 에러: ', error);
  }
};

// 지원자 정보
// const selectedApplicant = ref(null);
const selectedApplicant = ref({
  boardId: 0,
  userNickname: '',
  positionName: '',
  participationStatus: ''
});

// 지원자 지원내용 상세 정보 모달
const showModal = ref(false);
const openModal = (applicant) => {
  selectedApplicant.value = applicant; // 클릭한 지원자 정보를 모달에 전달
  showModal.value = true;
};

// 지원자 승인 모달상태
const isConfirmModal = ref(false);

//지원자 거절 Api
const reject = async () => {
  console.log('거절 시 지원정보', selectedApplicant.value);

  if (selectedApplicant.value) {
    const { boardId, userNickname, positionName, participationStatus } = selectedApplicant.value;
    console.log('보드아이디,닉네임,포지션, 승인상태', boardId, userNickname, positionName, participationStatus);

    const data = {
      boardId,
      userNickname,
      positionName,
      participationStatus: '거절'
    };

    try {
      const res = await admitApplicants(data); // API 호출
      if (res.status === 200) {
        alert('거절되었습니다.');
        isConfirmModal.value = true;
        closeModal(); // 모달 닫기
        applicants(); // 지원자 목록 업데이트
      } else {
        console.error('거절 실패', res);
      }
    } catch (error) {
      console.error('지원자 거절 API 호출 에러', error);
    }
  }
};

//지원자 승인 Api
const admit = async () => {
  console.log('승인 시 지원정보', selectedApplicant.value);

  if (selectedApplicant.value) {
    const { boardId, userNickname, positionName, participationStatus } = selectedApplicant.value;
    console.log('보드아이디,닉네임,포지션, 승인상태', boardId, userNickname, positionName, participationStatus);

    const data = {
      boardId,
      userNickname,
      positionName,
      participationStatus: '승인'
    };

    try {
      const res = await admitApplicants(data);
      if (res.status === 200) {
        isConfirmModal.value = true;
        alert('승인하였습니다.');
        closeModal(); // 모달 닫기
        applicants();
      } else {
        console.error('승인 실패', res);
      }
    } catch (error) {
      console.error('지원자 승인 API 호출 에러', error);
    }
  }
};

// 모달을 닫기 위한 함수
const closeModal = () => {
  showModal.value = false;
};

watchEffect(() => {
  applicants();
});
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 15px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.isVisible {
  display: none;
}
</style>
