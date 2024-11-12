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
        <div class="justify-between grid grid-cols-9 gap-4 px-10">
          <div class="flex flex-col space-y-10 col-span-3">
            <div class="items-center">
              <label for="region" class="font-bold pr-2 text-lg">지역 / 구분</label>
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
            <p class="font-bold pr-2 text-lg">모집 마감일</p>
            <p class="py-2 pl-2">{{ endDate }}</p>
          </div>
          <div class="space-y-4 col-span-4 pl-20 flex flex-col">
            <p class="font-bold pr-2 text-lg">모집 현황</p>
            <!-- flex-col로 세로 방향으로 배치 -->
            <div class="flex flex-col w-full space-y-4">
              <div v-for="(position, index) in positions" :key="index" class="flex items-center justify-between">
                <p>{{ position.positionName }}</p>
                <p class="m-auto">{{ position.currentCount }}/{{ position.requiredCount }}</p>
                <button class="item-center border flex-shrink-0 border-gray-200 rounded-full min-w-14 h-7 pl-2 pr-2 m-auto hover:bg-gray-200">지원</button>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <p class="font-bold text-lg w-full items-center text-center">기술 / 언어</p>
            <div class="flex items-center w-full">
              <div class="py-2 space-x-5" v-for="tech in techStacks" :key="tech">
                <img :src="tech.imageUrl" class="w-10 h-10" />
                <span class="text-sm">{{ tech.techStackName }}</span>
              </div>
              <!--말줄임-->
              <!-- <div class="py-2 space-x-5 flex items-center">
                <div v-for="tech in techStacks.slice(0, 4)" :key="tech.id" class="inline-flex items-center space-x-2">
                  <img :src="tech.imageUrl" class="w-10 h-10" />
                  <span class="text-sm">{{ tech.techStackName }}</span>
                </div>

                <div v-if="techStacks.length > 4" class="inline-flex items-center space-x-2">
                  <span class="text-sm text-gray-400">...</span>
                </div>
              </div> -->
              <!--ㅎㅎ-->
            </div>
          </div>
        </div>

        <h1 class="pt-8 pl-3 font-bold text-xl">프로젝트 소개</h1>
        <div class="mb-5">
          <hr class="border-t-4 border-[#d10000]" />
        </div>
        <p class="px-10 pb-6">{{ content }}</p>
        <!--사진-->
        <div v-for="image in files" :key="image.imageUrl">
          <img :src="image.imageUrl" />
        </div>

        <!--글 박스 끝-->
        <div>
          <hr class="border-t-2 border-gray-200" />
        </div>
        <div class="flex justify-between mb-3 mx-7">
          <RouterLink to="/"><button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-gray-200" @click="goToList">목록</button></RouterLink>
          <div class="space-x-3">
            <button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]" @click="doUpdate">수정</button>
            <button class="border border-gray-200 rounded-full px-4 py-1 text-sm hover:bg-[#d10000] hover:text-white hover:border-[#d10000]" @click="doDelete">삭제</button>
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
                <button class="text-sm hover:underline ml-2">수정</button>
                <button class="text-sm hover:underline ml-2" @click="commentDelete(comment.id)">삭제</button>
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
</template>

<script setup>
import { getProjectView, getCommentsView, saveComments, deleteProject, deleteComments } from '@/api/projectApi';
import router from '@/router';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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
    // console.log('게시글 정보', res.data.result);
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
</script>

<style lang="scss" scoped></style>
