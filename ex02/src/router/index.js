import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from '@/views/project/ProjectList.vue';
import ProjectCreate from '@/views/project/ProjectCreate.vue';
import ProjectUpdate from '@/views/project/ProjectUpdate.vue';
import ProjectView from '@/views/project/ProjectView.vue';

import Profile from '@/views/auth/Profile.vue';
import UserProfile from '@/views/project/userprofile.vue';
import MyPage from '@/views/mypage/MyPage.vue';
import MyProfileEdit from '@/views/mypage/MyProfileEdit.vue';
import MyComment from '@/views/mypage/MyComment.vue';
import MyLikePost from '@/views/mypage/MyLikePost.vue';
import MyProfile from '@/views/mypage/MyProfile.vue';
import ProjectManagement from '@/views/mypage/ProjectManagement.vue';
import Projectapplication from '@/views/mypage/ProjectApplication.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'projectlist',
      component: ProjectList
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
      children: [
        {
          path: 'myprofile',
          name: 'myprofile',
          component: MyProfile
        },
        {
          path: '/myprofileedit',
          name: 'myprofileedit',
          component: MyProfileEdit
        },
        {
          path: 'mycomments',
          name: 'mycomments',
          component: MyComment
        },

        {
          path: 'mylikeposts',
          name: 'mylikeposts',
          component: MyLikePost
        },
        {
          path: 'projectapplication',
          name: 'projectapplication',
          component: Projectapplication
        },
        {
          path: 'projectmanagement',
          name: 'projectmanagement',
          component: ProjectManagement
        },
        
        {
          path: '', // 기본 경로: /mypage
          name: 'default', // 이름 추가
          redirect: 'myprofile' // 기본페이지 myprofile로 리디렉션
        }
      ]
    },
    {
      path: '/projectcreate',
      name: 'projectcreate',
      component: ProjectCreate
    },
    {
      path: '/projectupdate/:board_id',
      name: 'projectupdate',
      component: ProjectUpdate
    },
    {
      path: '/projectview/:board_id',
      name: 'projectview',
      component: ProjectView
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/userprofile',
      name: 'userprofile',
      component: UserProfile
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 페이지 이동 후 항상 페이지 맨 위로 스크롤 이동
    if (savedPosition) {
      return savedPosition;  // 이전에 저장된 위치로 돌아가기
    }
    return { top: 0 };  // 페이지 맨 위로 스크롤
  }
});

export default router;
