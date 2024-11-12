import axios from 'axios';
// import { GLOBAL_URL } from './util';

// const url = 'http://192.168.0.61:8080';
const url = 'http://localhost:8080';
// const url = GLOBAL_URL

export const loginUsers = async () => {
  try {
    const res = await axios.get(`${url}/api/v1/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
      //  // email이 res.data.email로 수정됨
      //  localStorage.setItem('email', res.result.email); // email을 제대로 저장
      //  console.log("res.result.email로 출력", res.result.email);
      //  console.log("res.daat.email로 출력", res.data.email);
       return res.data;
     } catch (err) {
       console.error(err);
       return err;
     }
};


export const uploadprofile = async (formData) => {
  try {
    const res = await axios.put(`${url}/api/v1/users/profile`,formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
        // localStorage.setItem('email',res.email);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};


// export const userProfile = async (userProfileData) => {
//   if (localStorage.getItem('token') == null) return;
//   const base64String =userProfileData.profileImage;
//   // 'data:image/png;base64,' 부분을 제거하여 실제 Base64 데이터만 추출
//   const base64Data = base64String.split(',')[1];
//   // Base64 데이터를 디코딩하여 Blob 객체 생성
//   const byteCharacters = atob(base64Data);
//   const byteArrays = [];
//   for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
//     const slice = byteCharacters.slice(offset, offset + 1024);
//     const byteNumbers = new Array(slice.length);

//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   try {
//     const formData = new FormData(); // FormData를 사용하여 파일과 데이터를 함께 전송
//     formData.append('userProfile', new Blob([JSON.stringify(userProfileData)], { type: 'application/json' })); // userProfile 데이터
//     console.log('파일이미지 추가 했음 시작' + userProfileData.profileImage);
//     if (userProfileData.profileImage) {
//       formData.append('profileImage', new File([new Blob(byteArrays, { type: 'image/png' })], 'profile.jpg')); // 프로필 이미지가 있을 경우 추가
//       console.log('파일이미지 진짜 추가 했음');
//     }
//     console.log('파일이미지 추가 했음 끝');

//     const res = await axios.put(`${url}/api/v1/users/profile`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // multipart/form-data로 설정
//         Authorization: `Bearer ${localStorage.getItem('token')}` // 인증 토큰 추가
//       }
//     });
//     // 성공적으로 업데이트된 데이터 반환
//     console.log('소셜 로그인 및 사용자 정보 저장 성공:', res.data);
//     return res.data; // 성공적으로 저장된 데이터 반환
//   } catch (err) {
//     console.error('소셜 로그인 및 사용자 정보 저장 실패:', err);
//     throw err; // 에러를 다시 던져서 호출자에게 전달
//   }
// };

// // 닉네임 중복 확인
// export const checkNickname = async (nickname) => {
//   try {
//     const res = await axios.get(`${url}/api/v1/users/nickname-check`, {
//       params: { nickname }, // 쿼리 파라미터로 닉네임 전달
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     console.log('닉네임 중복 확인 결과:', res.data);
//     return res.data; // 사용 가능 여부를 반환
//   } catch (err) {
//     console.error('닉네임 중복 확인 실패:', err);
//     throw err; // 에러를 다시 던져서 호출자에게 전달
//   }
// };

// 사용자 정보 삭제
export const deleteUser = async () => {
  try {
    const res = await axios.delete(`${url}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // 인증 토큰 추가
      }
    });
    console.log('사용자 정보 삭제 성공:', res.data);
    return res.data;
  } catch (err) {
    console.error('사용자 정보 삭제 실패:', err);
    return err;
  }
};
