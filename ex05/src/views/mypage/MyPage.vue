<template>
  <div class="w-4/6 mx-auto">
    <RouterLink to="/mypage">
      <div class="flex pt-10 mb-10">
        <font-awesome-icon icon="user" class="h-6 w-5 p-1 mr-1 text-gray-300" />
        <h1 class="font-bold text-2xl">마이페이지</h1>        
      </div>
    </RouterLink>

    <!-- 탭 메뉴 -->
    <div class="flex flex-wrap m-auto justify-around gap-5">
      <RouterLink to="/mypage/myprofile" class="mypage-tab mb-10 px-4 py-2 mx-2 hover:font-bold" active-class="font-bold border-b-2 border-[#d10000]">내 정보</RouterLink>
      <RouterLink to="/mypage/projectmanagement" class="mypage-tab mb-10 px-4 py-2 mx-2 hover:font-bold" active-class="font-bold border-b-2 border-[#d10000]">프로젝트 관리</RouterLink>
      <RouterLink to="/mypage/mycomments" class="mypage-tab mb-10 px-4 py-2 mx-2 hover:font-bold" active-class="font-bold border-b-2 border-[#d10000]">나의 댓글</RouterLink>
      <RouterLink to="/mypage/projectapplication" class="mypage-tab mb-10 px-4 py-2 mx-2 hover:font-bold" active-class="font-bold border-b-2 border-[#d10000]">신청 관리</RouterLink>
      <RouterLink to="/mypage/mylikeposts" class="mypage-tab mb-10 px-4 py-2 mx-2 hover:font-bold" active-class="font-bold border-b-2 border-[#d10000]">내 관심 글</RouterLink>
      <!--라우터 뷰를 넣어야 vue안에 있는 내용들을 탭을 눌렀을 때도 보여줌-->
      <RouterView />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
