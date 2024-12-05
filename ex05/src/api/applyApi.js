import axios from 'axios';
// import { GLOBAL_URL } from './util';

// const url = 'http://192.168.0.61:8080/api/v1/boards';
const url = 'http://localhost:8080/api/v1/users';
// const url = `${GLOBAL_URL}/api/v1/boards`;

// 지원자 리스트
export const getApplicants = async (user_id) => {
  try {
    const res = await axios.get(`${url}/${user_id}/applicantsV2`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('프로젝트 지원자 리스트 Api 에러 발생', e);
    return e;
  }
};

// 지원자 승인, 거절
export const admitApplicants = async (data) => {
  try {
    const res = await axios.post(`${url}/admit`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('프로젝트 지원자 승인 Api 에러 발생', e);
    return e;
  }
};

// 내가 지원한 목록
export const getMyApplies = async (user_id) => {
  try {
    const res = await axios.get(`${url}/${user_id}/applies`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('내가 지원한 목록 Api 에러 발생', e);
    return e;
  }
};
