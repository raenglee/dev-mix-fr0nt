import axios from 'axios';
// import { GLOBAL_URL } from './util';

// const url = 'http://192.168.0.61:8080/api/v1/boards';
const url = 'http://localhost:8080/api/v1/boards';
// const url = `${GLOBAL_URL}/api/v1/boards`;


// 프로젝트 전체 리스트
export const listProject = async (pageNumber = 1, pageSize = 16) => {
  if (pageNumber == undefined) pageNumber = 0; // 예외방지

  try {
    const res = await axios.get(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    // console.log('리스트 가져오기 axios 연결: ', res);
    return res.data.result;
  } catch (e) {
    console.log('프로젝트 전체 리스트 Api 에러 발생', e);
    return e;
  }
};

// 프로젝트 상세 페이지
export const getProjectView = async (board_id) => {
  // console.log('게시판 주소: ', `${url}/${board_id}`);
  try {
    const res = await axios.get(`${url}/${board_id}`);
    return res;
  } catch (e) {
    console.log('프로젝트 상세페이지 가져오기 Api 에러 발생', e);
    return e;
  }
};

// 프로젝트 총 페이지수
export const totalPage = async () => {
  try {
    const res = await axios.get(`${url}/total-boards`);
    return res.data;
  } catch (e) {
    console.log('토탈 페이지수 Api 에러 발생', e);
    return e;
  }
};

// 프로젝트 저장
export const saveProject = async (formData) => {
  // console.log('저장axios 호출');
  // console.log('토큰: ', localStorage.getItem('token'));
  try {
    const res = await axios.post(`${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('저장 Api 에러 발생:', e.response ? e.response.data : e.message);
    // console.log(res.data);
    return e;
  }
};

export const updateProject = async (formData) => {
  // console.log('저장axios 호출');
  // console.log('토큰: ', localStorage.getItem('token'));
  try {
    const res = await axios.put(`${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('저장 Api 에러 발생:', e.response ? e.response.data : e.message);
    // console.log(res.data);
    return e;
  }
};

// 프로젝트 삭제
export const deleteProject = async (board_id) => {
  try {
    const res = await axios.delete(`${url}/${board_id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('프로젝트 삭제 Api 에러 발생', e);
    return e;
  }
};

// DB에 저장된 기술 스택 가져오기
export const getTechstacks = async () => {
  try {
    const res = await axios.get(`${url}/tech-stacks`);
    // console.log('getTechstacks axios호출: ', res);
    return res;
  } catch (e) {
    console.log('기술스택 Api 에러 발생', e);
    return e;
  }
};

// DB에 저장된 포지션 가져오기
export const getPositions = async () => {
  try {
    const res = await axios.get(`${url}/positions`);
    // console.log('getPositions axios호출: ', res);
    return res;
  } catch (e) {
    console.log('포지션 Api 에러 발생', e);
    return e;
  }
};

// DB에 저장된 지역 가져오기
export const getLocation = async () => {
  try {
    const res = await axios.get(`${url}/locations`);
    // console.log('getLocations axios호출: ', res);
    return res;
  } catch (e) {
    console.log('지역 Api 에러 발생', e);
    return e;
  }
};

// 댓글 가져오기
export const getCommentsView = async (board_id) => {
  try {
    const res = await axios.get(`${url}/${board_id}/comments`);
    return res;
  } catch (e) {
    console.log('댓글 가져오기 Api 에러 발생', e);
    return e;
  }
};

// 댓글 저장하기
export const saveComments = async (board_id, data) => {
  try {
    // console.log('댓글작성 axios 호출', data, '보드아이디', board_id);
    const res = await axios.post(`${url}/${board_id}/comments`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('댓글 삭제 Api 에러 발생', e);
    return e;
  }
};

// 댓글 삭제하기
export const deleteComments = async (board_id, comment_id) => {
  try {
    console.log('댓글삭제 axios 호출:', '보드id', board_id, '댓글id', comment_id);
    console.log(`${url}/${board_id}/comments/${comment_id}`);
    const res = await axios.delete(`${url}/${board_id}/comments/${comment_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('댓글 작성 Api 에러 발생', e);
    return e;
  }
};

// 프로젝트 신청
export const applyProject = async (board_id, data) => {
  try {
    const res = await axios.post(`${url}/${board_id}/apply`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('프로젝트 신청 Api 에러 발생', e);
    return e;
  }
};

// 프로젝트 승인

// 프로젝트 스크랩(북마크)
export const scrapProject = async (board_id, data) => {
  // console.log(`${url}/${board_id}/scrap`);
  try {
    // console.log('북마크 axios 호출', data, '보드아이디', board_id);
    const res = await axios.put(`${url}/${board_id}/scrap`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return res;
  } catch (e) {
    console.log('북마크 Api 에러 발생', e);
    return e;
  }
};
