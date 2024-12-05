<template>
  <div class="w-4/6 mx-auto my-10">
    <section class="container mx-auto">
      <form @submit.prevent="handleSubmit" class="gap-y-5 px-20 py-10">
        <div class="justify-center items-center text-center space-y-3 pb-8">
          <p class="border border-[#d10000] rounded-full px-4 text-center m-auto inline-block">
            {{ recruitmentStatus }}
          </p>
          <h1 class="text-center font-bold text-2xl">{{ title }}</h1>
          <div class="flex space-x-2 items-center justify-center">
            <img v-if="profileImage" :src="profileImage" class="h-8 w-8 rounded-full" />
            <img v-else src="/img/people.png" class="h-8 w-8 rounded-full" />
            <p>{{ nickname }}</p>
          </div>
          <p class="text-gray-500 text-l text-right pr-10">조회수: {{ viewCount }}</p>
          <div class="my-3 mb-20">
            <hr class="border-t-4 border-[#d10000]" />
          </div>
        </div>
        <div class="flex flex-wrap px-16">
          <div class="flex-none flex-col space-y-10 min-w-[300px]">
            <div class="items-center">
              <p for="region" class="font-bold text-lg pr-2">지역 / 구분</p>
              <p class="py-2 pl-2">{{ location }}</p>
              <!-- 지역 정보 표시 -->
            </div>
            <div class="items-center">
              <p class="font-bold pr-2 text-lg">진행 기간</p>
              <p class="py-2 pl-2">{{ projectPeriod }}</p>
            </div>

            <div class="flex flex-col col-span-3 items-center">
              <p class="font-bold text-lg w-full">기술 / 언어</p>
              <div class="flex items-center w-full justify-start space-x-4">
                <div class="flex flex-col items-center space-y-2 py-2" v-for="tech in techStacks" :key="tech.techStackName">
                  <!-- 이미지의 크기 맞추기 -->
                  <div class="w-10 h-10 overflow-hidden">
                    <img :src="tech.imageUrl" class="w-full h-full object-cover" />
                  </div>
                  <span class="text-sm text-center">{{ tech.techStackName }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="min-w-[270px]">
            <p class="font-bold text-lg pr-2">모집 마감일</p>
            <p class="py-2 pl-2">{{ endDate }}</p>
          </div>
          <div class="space-y-4 min-w-[410px] pl-15 flex flex-col">
            <p class="font-bold pr-2 text-lg">모집 현황</p>
            <!-- flex-col로 세로 방향으로 배치 -->
            <div class="flex flex-col w-full space-y-4">
              <div v-for="(position, index) in positions" :key="index" class="flex items-center justify-between">
                <p class="w-1/3 text-left">{{ position.positionName }}</p>
                <p class="w-1/3 text-center">{{ position.currentCount }}/{{ position.requiredCount }}</p>
                <button
                  v-if="!(nickname == loggedInUserNickname) && !isPending"
                  @click="openModal(position.positionName)"
                  class="border border-gray-200 rounded-full whitespace-nowrap px-4 hover:bg-gray-200"
                >
                  지원
                </button>

                <button v-if="isPending && nickname !== loggedInUserNickname" class="border border-gray-200 rounded-full whitespace-nowrap px-4 py-1 bg-gray-300 item-center cursor-not-allowed">
                  승인대기
                </button>

                <button v-if="nickname == loggedInUserNickname" @click="goToProjectApp" class="border text-sm border-gray-200 rounded-full whitespace-nowrap px-4 py-1 hover:bg-gray-200">
                  지원자 확인
                </button>

                <!-- <button v-if="isPending" class="border border-gray-300 bg-gray-300 text-gray-500 rounded-full py-1 px-3 w-20" disabled>지원되었습니다</button> -->
              </div>
            </div>
          </div>
        </div>

        <h1 class="py-8 pl-10 font-bold text-xl">프로젝트 소개</h1>
        <hr class="border-t-2 border-gray-200 px-5" />
        <p class="px-10 py-6">{{ content }}</p>
        <!--사진-->
        <div v-for="image in files" :key="image" class="mb-10">
          <img :src="image.imageUrl" />
        </div>

        <!--글 박스 끝-->
        <div>
          <hr class="border-t-4 border-[#d10000]" />
        </div>
        <div class="flex justify-between my-5 mx-7">
          <RouterLink to="/"><button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-gray-200" @click="goToList">목록</button></RouterLink>
          <div class="space-x-3">
            <button v-if="nickname == loggedInUserNickname" class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]" @click="doUpdate">
              수정
            </button>
            <button v-if="nickname == loggedInUserNickname" class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]" @click="doDelete">
              삭제
            </button>
          </div>
        </div>
        <!-- 댓글 작성 -->
        <div class="ml-30 justify-center items-center w-full">
          <div class="flex items-center pt-3">
            <div class="flex items-center w-8 h-8">
              <img v-if="useStore.profileImage" :src="useStore.profileImage" class="h-8 w-8 rounded-full" />
              <img v-else src="/img/people.png" class="h-8 w-8 rounded-full" />
            </div>
            <p class="ml-3">{{ useStore.nickname }}</p>
          </div>
          <!--댓글 입력창-->
          <div class="flex items-center w-full">
            <div class="my-6 mx-7 justify-center" style="width: 90%">
              <textarea v-model="commentContent" class="w-full p-3 h-20 border border-gray-200 rounded-md focus:outline-none ring-gray-200 resize-none bg-gray-100" placeholder="250자 제한"></textarea>
            </div>
            <div>
              <button class="border border-gray-200 rounded-md h-20 w-20 px-2 text-base hover:bg-gray-100" @click="commentsave">등록</button>
            </div>
          </div>
          <!--댓글목록-->
          <div class="my-6 mx-7 justify-center flex flex-col gap-5" style="width: 90%">
            <div v-for="comment in comments" :key="comment.id">
              <!-- 댓글 방식 확인 {{ comment }} -->
              <div class="flex items-center mx-2 mb-4">
                <img v-if="comment.profileImage" :src="comment.profileImage" class="h-8 w-8 rounded-full" />
                <img v-else src="/img/people.png" class="h-8 w-8 rounded-full" />
                <p class="font-semibold ml-2 text-gray-800">{{ comment.userNickName }}</p>
              </div>
              <!--댓글 수정 시-->
              <div v-if="comment.isEditing" class="flex">
                <textarea v-model="comment.newContent" class="w-full ml-4 p-3 h-10 border border-gray-200 rounded-md focus:outline-none ring-gray-100 resize-none bg-gray-100"></textarea>
                <div class="">
                  <button @click="commentupdate(comment.commentId)" class="ml-4 border border-gray-200 rounded-md h-10 w-20 px-2 text-base hover:bg-gray-100">수정</button>
                  <button @click="updatecancle" class="ml-4 text-sm hover:underline text-gray-500">취소</button>
                </div>
              </div>
              <div v-else class="flex justify-between">
                <!-- 댓글 내용 -->
                <p class="text-gray-800 ml-4">{{ comment.content }}</p>
                <div>
                  <button v-if="comment.userNickName == loggedInUserNickname" class="text-sm hover:underline ml-2" @click="startEditing(comment)">수정</button>
                  <button v-if="comment.userNickName == loggedInUserNickname" class="text-sm hover:underline ml-2" @click="commentDelete(comment.commentId)">삭제</button>
                </div>
              </div>
              <!-- <p v-if="comment.lastModifiedAt" class="text-xs mt-3 mb-4 mx-2 text-gray-500">{{ comment.lastModifiedAt }}</p> -->
              <p class="text-xs mt-3 mb-4 mx-2 ml-4 text-gray-500">{{ comment.lastModifiedAt }}</p>
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
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-bold text-xl text-center">지원 하시겠습니까?</h2>
        <button class="h-4 w-4" @click="closeModal"><img src="/img/x.png" /></button>
      </div>
      <div class="flex flex-col mb-4 gap-2">
        <label for="position" class="font-bold">지원 직군</label>
        <p class="text-sm bg-gray-100 rounded-lg p-4 font-bold">{{ positionName }}</p>
        <label for="note" class="font-bold">지원 사유 및 한마디</label>
        <textarea id="note" v-model="note" placeholder="지원 사유 및 한마디"></textarea>
      </div>
      <div class="flex justify-center gap-3 mb-4">
        <button type="button" class="border border-gray-300 bg-gray-300 rounded-full py-1 px-3 w-20" @click="closeModal">아니오</button>
        <button class="border border-[#d10000] bg-[#d10000] text-white rounded-full py-1 px-3 w-20" @click="confirmSubmit">예</button>
      </div>
      <p class="text-center text-xs text-gray-500 mb-3">예를 누르시면, 정보제공 / 유의사항에 동의 한 것으로 간주합니다.</p>
      <h3 class="text-sm text-gray-700 font-bold mb-2">유의사항</h3>
      <ul class="text-xs text-gray-400 flex flex-col gap-1">
        <li>프로젝트 리더에게 가입하신 이메일 정보가 제공됩니다.</li>
        <li>프로젝트에서 작업한 저작권에 프로젝트에 귀속됩니다.</li>
        <li>프로젝트 분쟁사항은 데브믹스에서 책임지지 않습니다.</li>
        <li>리더가 14일동안 승인하지 않으면 자동 취소됩니다.</li>
      </ul>
    </div>
  </div>

  <!-- 승인대기 모달 -->
  <div v-if="isConfirmModal" class="modal-container" @click.self="closeConfirmModal">
    <div class="bg-white p-4 rounded-xl shadow-xl">
      <h2 class="font-bold text-xl flex justify-center text-center mb-4">지원이 완료되었습니다!</h2>
      <p class="text-gray-800 text-sm mb-4">작성자가 승인하면 프로젝트에 참가하게 됩니다.</p>
      <div class="flex justify-center">
        <button @click="closeConfirmModal" class="font-bold text-center border bg-white rounded-md py-1 px-3 hover:bg-gray-200">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProjectView, getCommentsView, saveComments, deleteProject, deleteComments, updateComments } from '@/api/projectApi';
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
const profileImage = ref('');
const techStacks = ref([]);
const positions = ref([]);
const recruitmentStatus = ref('');
const files = ref([]);

watchEffect(async () => {
  const res = await getProjectView(route.params.board_id);
  if (res.status == 200) {
    // console.log('게시글 정보', res.data.result);
    title.value = res.data.result.title;
    content.value = res.data.result.content;
    location.value = res.data.result.location;
    endDate.value = res.data.result.endDate;
    projectPeriod.value = res.data.result.projectPeriod;
    viewCount.value = res.data.result.viewCount;
    nickname.value = res.data.result.nickname;
    profileImage.value = res.data.result.profileImage;
    techStacks.value = res.data.result.techStackDtoList;
    positions.value = res.data.result.positionDtoList;
    recruitmentStatus.value = res.data.result.recruitmentStatus;
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
  // console.log(comments.value);
});

// 댓글 작성
const commentContent = ref('');
const board_id = ref(route.params.board_id);

const commentsave = async () => {
  const data = {
    content: commentContent.value
  };
  // console.log('댓글 내용', JSON.stringify(data));
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
// console.log('useStore.nickname.value: ' + useStore.nickname);

// 댓글 수정시 텍스트박스로 변경
const startEditing = (comment) => {
  comment.isEditing = true;
  comment.newContent = comment.content; // 기존 댓글 내용을 newContent에 설정
};

// 댓글 수정
const commentupdate = async (commentId) => {
  const comment = comments.value.find((c) => c.commentId === commentId);
  console.log('댓글', comments.value);
  // console.log('댓글id',commentId)
  const data = {
    id: commentId,
    content: comment.newContent
  };

  const res = await updateComments(board_id.value, data);
  if (res.status === 200) {
    alert('댓글이 수정되었습니다.');
    const updatedComments = await getCommentsView(board_id.value);
    if (updatedComments.status === 200) {
      comments.value = updatedComments.data.result; // 댓글 목록 갱신
    }
    return;
  }
  alert('에러: ' + res.data);
};

const updatecancle = async () => {
  comments.value.forEach((comment) => {
    comment.isEditing = false;
  });
};

// 댓글 삭제
const commentDelete = async (id) => {
  // console.log('댓글 id:', id);
  // console.log('보드 id:', route.params.board_id);
  const isConfirmed = window.confirm('댓글을 삭제 하시겠습니까?');
  if (isConfirmed) {
    try {
      const res = await deleteComments(route.params.board_id, id);
      if (res.status === 200) {
        alert('댓글이 삭제되었습니다.');
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

// 지원 API 호출
const confirmSubmit = async () => {
  try {
    const data = {
      positionName: positionName.value,
      note: note.value
    };
    console.log('isPending:', isPending.value);

    const res = await applyProject(route.params.board_id, data);
    // console.log('보드아이디,내용', route.params.board_id, data);
    // console.log('지원하기 모달', res);
    
    if (res.status === 200) {
      isPending.value = true;
      console.log('isPending:', isPending.value);
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

// 지원완료 모달 닫기
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

.isVisible {
  display: none;
}
</style>
