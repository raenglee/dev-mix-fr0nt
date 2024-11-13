<template>
  <div class="flex justify-center items-center mx-auto my-10">
    <div class="justify-center items-center">
      <div class="my-3">
        <div class="grid grid-cols-6">
      
          <h2 class="text-2xl font-semibold ml-10 mb-5 text-center">내 정보 입력</h2>
        </div>
        <hr class="border-t-4 border-[#d10000]" />

        <form @submit.prevent="handleSubmit" class="grid gap-y-6 px-20 py-10">
          <!-- 프로필 사진 -->
          <!-- 삭제 아이콘 -->
          <!-- <button @click.stop="removeFile" class="text-gray-500 text-lg hover:text-[#d10000]">
            <FontAwesomeIcon icon="fa-solid fa-trash" size="sm" />
          </button> -->
          <div class="grid grid-cols-5 items-center gap-x-4">
            <label for="profileImage" class="col-start-2 text-gray-700 text-lg font-semibold">프로필 사진</label>
            <div class="col-span-2 flex items-center">
              <!-- 파일 인풋을 숨기고, 클릭하면 파일을 선택 -->
              <input type="file" @change="onFileChange" accept="image/*" class="hidden" ref="fileInput" />
              <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" @click="selectFile">
                <!-- 이미지가 있으면 미리보기, 없으면 + 버튼을 보여줌 -->
                <img v-if="profileImage" :src="profileImage" class="w-full h-full rounded-full object-cover" />
                <span v-else class="text-gray-500 text-2xl">+</span>
              </div>
            </div>
          </div>

          <!-- 닉네임 -->
          <div class="grid grid-cols-5 items-center gap-x-4">
            <label class="col-start-2 text-gray-700 text-lg font-semibold">닉네임 <span class="text-red-500">*</span></label>
            <div class="col-span-2 flex items-center">
              <input type="text" v-model="nickname" class="flex-1 border p-2 px-4 rounded-full" required />
              <!-- <button type="button" class="ml-2 border p-2 rounded-full text-gray-600">중복확인</button> -->
              <!-- <button type="button" @click="checkNickname"
                class="ml-2 border p-2 rounded-full text-gray-600">중복확인</button> -->
            </div>
            <p class="col-start-2 col-span-2 text-xs text-gray-500 mt-1">한글 영어 숫자, 1~8글자 이하 (공백, 특수문자 X)</p>
          </div>

          <!-- 소속 -->
          <div class="grid grid-cols-5 items-center gap-x-4">
            <label class="col-start-2 text-gray-700 text-lg font-semibold">소속</label>
            <input type="text" v-model="groupName" class="px-4 col-span-2 border p-2 rounded-full w-full" />
          </div>

          <!--🌍지역드롭다운-->
          <div class="grid grid-cols-5 items-center gap-x-4">
            <h1 class="col-start-2 font-bold text-lg pb-2">지역</h1>
            <select v-model="location" class="w-52 h-10 p-2 border border-gray-200 rounded-full cursor-pointer focus:outline-none">
              <option value="" disabled>{{ location ? location : '지역을 선택하세요' }}</option>
              <option>미정</option>
              <option>서울</option>
              <option>경기</option>
              <option>인천</option>
              <option>강원</option>
              <option>대구/경북</option>
              <option>대전/충청</option>
              <option>부산/울산/경남</option>
              <option>광주/전라</option>
              <option>제주</option>
            </select>
          </div>

          <!-- 포지션 새로운거-->
          <div class="grid grid-cols-5 items-center gap-x-4" ref="dropdownContainer">
            <h1 class="col-start-2 font-bold text-lg pb-2">포지션</h1>
            <div class="relative w-full m-auto flex">
              <div class="bg-white border border-gray-200 rounded-lg min-w-[610px] z-10">
                <div class="p-3">
                  <div v-for="positionName in roleOptions" :key="positionName" class="flex wrap gap-2">
                    <input
                      type="checkbox"
                      :value="positionName.positionName"
                      :id="positionName.positionName"
                      @change="positionList.push(positionName.positionName)"
                      class="cursor-pointer form-checkbox h-5 w-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                    />
                    <label class="cursor-pointer" :for="positionName.positionName">{{ positionName.positionName }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--✅기술/언어 선택 -> 다중선택, 선택삭제 가능하도록-->
          <div class="grid grid-cols-5 items-center gap-x-4" ref="dropdownContainer">
            <h1 class="col-start-2 font-bold text-lg pb-2">기술 / 언어<br /><span class="text-sm mx-1">(최대 10개)</span></h1>
            <div class="relative w-full m-auto flex">
              <div @click="toggleDropdown" class="min-w-72 h-10 p-2 border border-gray-200 rounded-full cursor-pointer flex items-center justify-between">
                <span>{{ selectedSkill.value || '기술을 선택하세요' }}</span>
                <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
              </div>
              <!--드롭다운-->
              <div v-if="isDropdownOpen" class="absolute bg-white border border-gray-200 rounded-lg mt-12 ml-1 min-w-96 z-10">
                <div class="grid grid-cols-5 gap-2 p-2">
                  <div v-for="tech in availableTechOptions" :key="tech" @click="selectSkill(tech)" class="cursor-pointer text-sm gap-3">
                    <img :src="tech.imageUrl" class="w-10 h-12 item-center hover:w-12" />
                    <p class="">{{ tech.techStackName }}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap col-span-2 flex-row">
                <div v-for="(skill, index) in selectedSkills" :key="index" @click="removeSkill(index)" class="pl-4 mt-1 mb-3 flex items-center gap-2 cursor-pointer">
                  <img :src="skill.imageUrl" class="w-8 h-8" />
                  <span class="text-sm m-auto w-16"> {{ skill.techStackName }}</span>
                  <span class="text-[#d10000] font-bold mx-3">x</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 버튼 -->
          <div class="flex justify-center gap-4 mt-6">
            <button type="button" @click="handleCancel" class="px-6 py-2 border border-gray-300 rounded-md">취소</button>
            <button type="submit" class="px-6 py-2 bg-red-600 text-white rounded-md">완료</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onBeforeUnmount, computed } from 'vue';
import { useUserStore } from '@/store/userStore';
import { loginUsers, uploadprofile, deleteUser } from '@/api/loginApi'; // registerUser 추가
import { useRouter } from 'vue-router';
import { getPositions, getTechstacks, getLocation } from '@/api/projectApi';

const useStore = useUserStore();
const router = useRouter();
// const route = useRoute();

// 포지션 데이터 가져오기
const isDropdownOpen = ref(false); // 드롭다운 닫힌(false) 상태

const nickname = ref('');
const groupName = ref('');
const location = ref('');
const profileImage = ref(null); // 프로필 이미지 미리보기용
const selectedFile = ref(null); // 실제 파일 객체 (FormData에 첨부할 용도)
const isSubmitted = ref(false); // 완료 버튼 클릭 여부를 추적
const fileInput = ref(null);

const positionOptions = ref([]); // 서버에서 전달 받은 포지션 지정
const techOptions = ref([]); // 서버에서 전달 받은 기술 저장
const locationOptions = ref([]); // 서버에서 전달 받은 지역 저장

const selectedSkill = ref(''); // 현재 선택된 기술 저장
const selectedSkills = ref([]); // 선택된 기술들의 배열
const positionList = ref([]);

const roleOptions = ref([]); // 서버에서 전달 받은 포지션 저장

// 포지션 리스트 불러오기
const selectPositions = async () => {
  try {
    const res = await getPositions();
    if (Array.isArray(res.data.result)) {
      positionOptions.value = res.data.result;
    } else {
      console.error('분야별 모집 인원 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

// 기술/언어 리스트 불러오기
const selelctTechstacks = async () => {
  try {
    const res = await getTechstacks();
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

// 지역 리스트 불러오기
const updateLocations = async () => {
  try {
    const res = await getLocation();
    if (Array.isArray(res.data.result)) {
      locationOptions.value = res.data.result; // 목록이 이름 하나이므로 배열에 넣을 필요X
    } else {
      console.error('지역 / 구분 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

// 기술 / 언어 서버 연결
const updateTechstacks = async () => {
  try {
    const res = await getTechstacks();
    // console.log('updateTechstacks 데이터 확인: ', res);
    techOptions.value = res.result; // 받아온 기술 목록을 techOptions에 저장
    if (Array.isArray(res.data.result)) {
      techOptions.value = res.data.result.map((item) => ({
        // 받아오는 정보가 두개이상이므로 map으로 가져온다.
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

// 선택된 기술을 제외한 선택 가능한 기술목록
const availableTechOptions = computed(() => {
  return techOptions.value.filter((tech) => !selectedSkills.value.includes(tech));
});

// 드롭다운 열고 닫기
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 기술 선택
const selectSkill = (tech) => {
  if (!selectedSkills.value.includes(tech) && selectedSkills.value.length < 10) {
    if (!selectedSkills.value.includes(tech)) {
      selectedSkills.value.push(tech);
      const indexToRemove = availableTechOptions.value.indexOf(tech); // "b"의 인덱스를 찾음
      if (indexToRemove !== -1) {
        availableTechOptions.value.splice(indexToRemove, 1); // 인덱스 위치에서 1개 요소 삭제
      }
    }
  }
  if (availableTechOptions.value.length === 0) {
    isDropdownOpen.value = false;
  }
  console.log(selectedSkills.value);
};

// 기술 삭제
const removeSkill = (index) => {
  selectedSkills.value.splice(index, 1);
  console.log(selectedSkills.value);
};

// 바탕 클릭 이벤트 처리
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative') && isDropdownOpen.value) {
    isDropdownOpen.value = false;
  }
};

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

// 포지션 서버 연결
const updatePositions = async () => {
  try {
    const res = await getPositions();
    if (Array.isArray(res.data.result)) {
      roleOptions.value = res.data.result; // 목록이 이름 하나이므로 배열에 넣을 필요X
    } else {
      console.error('분야별 모집 인원 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

// 프로필 이미지를 선택하는 핸들러
const onFileChange = (event) => {
  const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일을 가져옵니다.
  if (file) {
    selectedFile.value = file; // 파일을 저장 (FormData에 첨부할 파일)
    profileImage.value = URL.createObjectURL(file); // 이미지 미리보기 URL을 설정
  }
};

// 파일 삭제
const removeFile = () => {
  profileImage.value = null;
};

// 파일 인풋을 열기 위한 메서드
const selectFile = () => {
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click(); // 파일 인풋을 클릭하여 파일 선택
};

// 사용자가 입력한 데이터 저장
const handleSubmit = async () => {
  const formData = new FormData();
  const user = await loginUsers(); // 로그인된 사용자 정보 가져오기

  positionList.value = Array.from(new Set(positionList.value));
  const techStackNames = selectedSkills.value.reduce((acc, skill) => {
    acc.push(skill.techStackName);
    return acc;
  }, []);

  const userProfile = {
    email: user.result.email,
    nickname: nickname.value,
    groupName: groupName.value,
    location: location.value,
    positionList: positionList.value,
    techStackList: techStackNames,
    profileImage: profileImage.value
  };

  if (profileImage.value) {
    const file = selectedFile.value; // 실제 파일 객체 사용
    formData.append('profileImage', file, file.name); // 여기서 file.name으로 파일명 설정
  }
  formData.append('userProfile', new Blob([JSON.stringify(userProfile)], { type: 'application/json; charset=UTF-8' }));
  console.log('폼데이터최종', JSON.stringify(userProfile));

  try {
    await uploadprofile(formData); // formData 대신 userProfile 객체를 전달
    const data = await loginUsers();
    await useStore.profile(data.result); // 사용자 정보를 Pinia 스토어에 저장

    alert('회원가입이 완료되었습니다.');
    router.push('/'); // 성공 시 프로필 페이지로 이동
  } catch (err) {
    // 에러 처리
    alert('프로필 저장에 실패했습니다. 다시 시도해주세요.');
  }
};

//회원가입 취소
const handleCancel = async () => {
  alert('회원가입 취소.');
  await removeUserData();
  router.push('/');
};

// 사용자 데이터 삭제
const removeUserData = async () => {
  if (!isSubmitted.value) {
    try {
      await deleteUser(); // 사용자 정보 삭제 요청
      useStore.logout(); // Pinia 스토어에서 로그아웃 처리
      console.log('사용자 정보 삭제 및 로그아웃 완료');
    } catch (error) {
      console.error('사용자 정보 삭제 실패:', error);
      alert('사용자 정보 삭제에 실패했습니다.');
    }
  }
};

// 이벤트 리스너
watchEffect(() => {
  updateTechstacks(); // 기술, 언어 API 호출
  updatePositions(); // 포지션 API 호출
  updateLocations(); // 지역 API 호출
  document.addEventListener('mousedown', handleClickOutside); // 바탕 클릭 시 드롭다운 닫기
});

watchEffect(() => {
  selectPositions();
  selelctTechstacks();
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
