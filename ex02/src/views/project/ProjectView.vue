<template>
  <div class="w-4/6 mx-auto my-10">
    <section class="container mx-auto">
      <form @submit.prevent="handleSubmit" class="grid gap-y-5 px-20 py-10">
        <div class="justify-center items-center text-center space-y-3 pb-5">
          <p class="border border-[#d10000] rounded-full w-16 text-center m-auto">모집중</p>
          <h1 class="text-center font-bold text-2xl">{{ title }}</h1>
          <div class="flex space-x-2 items-center justify-center">
            <img src="/img/people.png" class="w-8 h-8" />
            <p>{{ nickname }}</p>
          </div>
          <p class="text-gray-500 text-l text-right pr-10">조회수: {{ viewCount }}</p>
          <div class="my-3 mb-20">
            <hr class="border-t-4 border-[#d10000]" />
          </div>
        </div>
        <div class="justify-between grid grid-cols-9 gap-4 px-20">
          <div class="flex flex-col space-y-10 col-span-3">
            <div class="items-center">
              <p for="region" class="font-bold text-lg pr-2">지역 / 구분</p>
              <p class="py-2 pl-2">{{ location }}</p>
              <!-- 지역 정보 표시 -->
            </div>
            <div class="items-center">
              <p class="font-bold pr-2 text-lg">진행 기간</p>
              <p class="py-2 pl-2">{{ projectPeriod }}</p>
            </div>
            <!-- <div class="items-center">
              <p class="font-bold pr-2 text-lg">기술 / 언어</p>
              <div class="flex items-center">
                <div class="py-2 space-x-3" v-for="tech in techStacks" :key="tech">
                  <img :src="tech.imageUrl" class="w-10 h-10" />
                  <span class="text-sm py-4">{{ tech.techStackName }}</span>
                </div>
              </div>
            </div> -->
          </div>
          <div class="col-span-2 pl-0">
            <p class="font-bold text-lg pr-2">모집 마감일</p>
            <p class="py-2 pl-2">{{ endDate }}</p>
          </div>
          <div class="space-y-4 col-span-4 pl-20 flex flex-col">
            <p class="font-bold pr-2 text-lg">모집 현황</p>
            <!-- flex-col로 세로 방향으로 배치 -->
            <div class="flex flex-col w-full space-y-4">
              <div v-for="(position, index) in positions" :key="index" class="flex items-center justify-between">
                <p class="w-1/3 text-left">{{ position.positionName }}</p>
                <p class="w-1/3 text-center">{{ position.currentCount }}/{{ position.requiredCount }}</p>
                <button
                  v-if="!(nickname == loggedInUserNickname)"
                  @click="openModal(position.positionName)"
                  class="border flex-shrink-0 border-gray-200 rounded-full min-w-14 h-7 px-4 hover:bg-gray-200"
                >
                  지원
                </button>

                <button v-else-if="!isPending && nickname !== loggedInUserNickname" class="border flex-shrink-0 border-gray-200 rounded-full min-w-14 h-7 px-4 bg-gray-300 cursor-not-allowed">
                  승인대기
                </button>

                <button v-if="nickname == loggedInUserNickname" @click="goToProjectApp" class="border flex-shrink-0 border-gray-200 rounded-full min-w-14 h-7 px-4 hover:bg-gray-200">
                  지원자 확인
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-col col-span-3 items-center pt-5">
            <p class="font-bold text-lg w-full">기술 / 언어</p>
            <div class="flex items-center w-full">
              <!-- <div class="py-2 space-x-5" v-for="tech in techStacks" :key="tech">
                <img :src="tech.imageUrl" class="w-10 h-10" />
                <span class="text-sm">{{ tech.techStackName }}</span>
              </div> -->
              <!--말줄임-->
              <div class="py-2 space-x-5 flex items-center">
                <!-- 최대 4개까지만 아이템을 출력하고 나머지는 '...'으로 표시 -->
                <div v-for="tech in techStacks.slice(0, 4)" :key="tech.id" class="inline-flex flex-col items-center space-x-2">
                  <img :src="tech.imageUrl" class="w-10 h-10" />
                  <span class="text-sm">{{ tech.techStackName }}</span>
                </div>

                <!-- 4개 이상의 항목이 있을 경우 '...' 표시 -->
                <div v-if="techStacks.length > 4" class="inline-flex items-center space-x-2">
                  <span class="text-sm text-gray-400">...</span>
                </div>
              </div>
              <!--ㅎㅎ-->
            </div>
          </div>
        </div>

        <h1 class="pt-8 pl-10 font-bold text-xl">프로젝트 소개</h1>
        <div class="mb-5">
          <hr class="border-t-2 border-gray-200 px-5" />
        </div>
        <p class="px-10 pb-6">{{ content }}</p>
        <!--사진-->
        <div v-for="image in files" :key="image">
          <img :src="image.imageUrl" />
        </div>

        <!--글 박스 끝-->
        <div>
          <hr class="border-t-4 border-[#d10000]" />
        </div>
        <div class="flex justify-between mb-3 mx-7">
          <RouterLink to="/"><button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-gray-200" @click="goToList">목록</button></RouterLink>
          <div class="space-x-3">
            <button 
            class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]" @click="doUpdate">
              수정
            </button> <!--v-if="nickname == loggedInUserNickname" -->
            <button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]" @click="doDelete">
              삭제
            </button> <!--v-if="nickname == loggedInUserNickname" -->
          </div>
        </div>
        <!-- 댓글 작성 -->
        <div class="ml-30 justify-center items-center w-full">
          <div class="flex items-center">
            <img src="/img/people.png" class="w-8 h-8 ml-7" />
            <p class="ml-3">{{ nickname }}</p>
          </div>
          <!--댓글 입력창-->
          <div class="flex items-center w-full">
            <div class="my-6 mx-7 justify-center" style="width: 90%">
              <textarea v-model="commentContent" class="w-full p-3 h-20 border border-gray-200 rounded-md focus:outline-none ring-gray-200 resize-none bg-gray-100"></textarea>
              <p>250자 제한</p>
            </div>
            <div>
              <button class="border border-gray-200 rounded-md h-20 w-20 px-2 text-base hover:bg-gray-100" @click="commentsave">등록</button>
            </div>
          </div>
          <!--댓글목록-->
          <div class="my-6 mx-7 justify-center flex flex-col gap-5" style="width: 90%">
            <div v-for="comment in comments" :key="comment.id">
              <!-- 댓글 방식 확인 {{ comment }} -->
              <div class="flex items-center mx-2">
                <img :src="comment.profileImage" class="w-8 h-8 rounded-full" />
                <p class="font-semibold ml-2 text-gray-800">{{ comment.nickname }}</p>
              </div>
              <div class="flex items-center justify-between mt-2 mx-2">
                <!-- 댓글 내용 -->
                <p class="text-gray-800 flex-1">{{ comment.commentContent }}</p>
                <button v-if="comment.nickname == loggedInUserNickname" class="text-sm hover:underline ml-2">수정</button>
                <button v-if="comment.nickname == loggedInUserNickname" class="text-sm hover:underline ml-2" @click="commentDelete(comment.id)">삭제</button>
              </div>
              <p class="text-xs mt-3 mb-4 mx-2 text-gray-500">{{ comment.createdAt }}</p>
              <div>
                <hr class="border-t border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>

  <!--지원모달-->

  <div v-if="showModal" class="modal-container" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">x</button>
      <h2 class="modal-title">지원하시겠습니까?</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="position">지원 직군</label>
          <!-- <input type="text" id="position" v-model="position" placeholder="지원 직군" /> -->
          <p>{{ positionName }}</p>
        </div>
        <div class="form-group">
          <label for="note">지원 사유 및 한마디</label>
          <textarea id="note" v-model="note" placeholder="지원 사유 및 한마디"></textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="closeModal">아니오</button>
          <button type="submit" class="btn-confirm" @click="confirmSubmit">예</button>
        </div>
        <p class="info-text">예를 누르시면, 정보제공 / 유의사항에 동의 한 것으로 간주합니다.</p>

        <h3 class="notes-title">유의사항</h3>
        <ul class="notes">
          <li>프로젝트에게 가입하신 이메일 정보에 제공됩니다.</li>
          <li>프로젝트에서 작업한 저작권에 프로젝트에 귀속됩니다.</li>
          <li>프로젝트 분쟁사항은 데브믹스에서 책임지지 않습니다.</li>
          <li>리더가 14일동안 승인하지 않으면 자동 취소됩니다.</li>
        </ul>
      </form>
    </div>
  </div>

  <!-- 승인대기 모달 -->
  <div v-if="isConfirmModal" class="modal-container" @click.self="closeConfirmModal">
    <div class="modal-content">
      <h2 class="modal-title">지원이 완료되었습니다!</h2>
      <p>작성자가 승인하면 프로젝트에 참가하게 됩니다.</p>
      <button @click="closeConfirmModal">확인</button>
    </div>
  </div>
</template>

<script setup>
import { getProjectView, getCommentsView, saveComments, deleteProject, deleteComments } from '@/api/projectApi';
import router from '@/router';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { applyProject } from '@/api/projectApi'; // API 임포트
import { useUserStore } from '@/store/userStore';

const useStore = useUserStore();
const route = useRoute();

// 로그인된 사용자 정보 (예: useStore 또는 localStorage에서 가져오는 값)
const loggedInUserNickname = ref(useStore.nickname);

const title = ref('');
const location = ref('');
const endDate = ref('');
const content = ref('');
const projectPeriod = ref('');
const viewCount = ref('');
const nickname = ref('');
const techStacks = ref([]);
const positions = ref([]);
const files = ref([]);

watchEffect(async () => {
  const res = await getProjectView(route.params.board_id);
  if (res.status == 200) {
    console.log('게시글 정보', res.data.result);
    title.value = res.data.result.title;
    content.value = res.data.result.content;
    location.value = res.data.result.location;
    endDate.value = res.data.result.endDate;
    projectPeriod.value = res.data.result.projectPeriod;
    viewCount.value = res.data.result.viewCount;
    nickname.value = res.data.result.nickname;
    techStacks.value = res.data.result.techStackDtoList;
    positions.value = res.data.result.positionDtoList;
    // console.log('기술스택확인', res.data.result.techStackDtoList);
    // console.log('포지션 배열 확인', res.data.result.positionDtoList);
    // console.log('이미지', res.data.result.imageUrl);
    files.value = [{ imageUrl: res.data.result.imageUrl }];
  } else {
    alert('데이터연결안됨', res.response.data.message);
  }
});

const goToProjectApp = () => {
  router.push({ name: 'projectapplication' }); // 'projectapplication' 경로로 이동
};

// 게시글 수정
const doUpdate = async () => {
  router.push({ name: 'projectupdate' });
};

// 게시글 삭제
const doDelete = async () => {
  const isConfirmed = window.confirm('프로젝트를 삭제하시겠습니까?');
  if (isConfirmed) {
    try {
      const res = await deleteProject(route.params.board_id);
      if (res.status === 200) {
        alert('프로젝트 구인글이 삭제되었습니다.');
        router.push({ name: 'projectlist' });
      } else {
        alert('에러: ' + res.data);
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  } else {
    //아무것도 하지않으므로 빈 상태
  }
};

const comments = ref([]);

// 댓글 데이터를 가져오는 함수
watchEffect(async () => {
  const res = await getCommentsView(route.params.board_id);
  if (res.status === 200 && res.data.result) {
    comments.value = res.data.result; // 댓글 데이터 배열을 할당
  }
});

// 댓글 작성
const commentContent = ref('');
const board_id = ref(route.params.board_id);

const commentsave = async () => {
  const data = {
    content: commentContent.value
  };
  console.log('댓글 내용', JSON.stringify(data));
  const res = await saveComments(board_id.value, data);
  if (res.status === 200) {
    alert('댓글이 작성되었습니다.');
    commentContent.value = '';
    const updatedComments = await getCommentsView(board_id.value);
    if (updatedComments.status === 200) {
      comments.value = updatedComments.data.result; // 댓글 목록 갱신
    }
    return;
  }
  alert('에러: ' + res.data);
};

// 댓글 삭제
const commentDelete = async (id) => {
  console.log('댓글 id:', id);
  console.log('보드 id:', route.params.board_id);
  const isConfirmed = window.confirm('댓글을 삭제 하시겠습니까?');
  if (isConfirmed) {
    try {
      const res = await deleteComments(route.params.board_id, id);
      if (res.status === 200) {
        alert('댓글이 정상적으로 삭제되었습니다.');
        const updatedComments = await getCommentsView(route.params.board_id);
        if (updatedComments.status === 200) {
          comments.value = updatedComments.data.result; // 댓글 목록 갱신
        }
      } else {
        alert('에러: ' + res.data);
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  } else {
    //아무것도 하지않으므로 빈 상태
  }
};

//모달

// 지원 직군을 저장하는 변수
const positionName = ref('');
// 완료 모달 표시 여부 제어
const isConfirmModal = ref(false);
// 모달의 가시성 상태를 제어하는 변수
const showModal = ref(false);

// 모달을 열기 위한 함수
const openModal = (position) => {
  // 클릭한 직군명 할당
  positionName.value = position;
  showModal.value = true;
};

// 모달을 닫기 위한 함수
const closeModal = () => {
  showModal.value = false;
};

//지원기능
const isPending = ref(false); // 지원 상태 변수
const note = ref('');

// 지원 API를 호출하고 상태 변경
const confirmSubmit = async () => {
  const data = {
    position: positionName.value,
    note: note.value
  };

  try {
    const res = await applyProject(route.params.board_id, data);
    if (res.status === 200) {
      isPending.value = true;
      closeModal(); // 기존 지원 모달 닫기
      isConfirmModal.value = true; // 완료 모달 열기
    } else {
      alert('지원에 실패했습니다.');
    }
  } catch (error) {
    console.error('지원 중 오류 발생:', error);
    alert('지원 중 오류가 발생했습니다.');
  }
};

// 완료 모달 닫기
const closeConfirmModal = () => {
  isConfirmModal.value = false;
};
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

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-title {
  text-align: left;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
  text-align: left;
}

label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

textarea {
  height: 120px;
  resize: none;
  overflow-y: auto;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-cancel,
.btn-confirm {
  width: 100px;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn-cancel {
  width: 110px;
  height: 50px;
  background-color: #ddd;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
}

.btn-confirm {
  width: 110px;
  height: 50xp;
  background-color: #e03a3e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
}

.info-text {
  font-size: 11px;
  text-align: center;
  color: #777;
  margin-top: 1rem;
}

.notes-title {
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: left;
}

.notes {
  font-size: 0.75rem;
  color: #555;
  margin-top: 1rem;
  padding-left: 1rem;
}

.notes li {
  margin-bottom: 0.5rem;
  text-align: left;
  list-style: disc;
}

.isVisible {
  display: none;
}
</style>
