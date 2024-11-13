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
    const res = await axios.put(`${url}/api/v1/users/profile`, formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};


export const checkNickname = async (nickname) => {
  try {
    const res = await axios.post(`${url}/api/v1/users/nickname-check` ,nickname, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};





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
