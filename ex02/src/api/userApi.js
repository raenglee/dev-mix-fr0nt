//특정 유저 정보 관련 api

import axios from 'axios';

// const url = 'http://192.168.0.61:8080';
const url = 'http://localhost:8080/api/v1/users';

//특정 유저 프로필 
export const userInfo = async (user_id) => {
    try {
      const res = await axios.get(`${url}/${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
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


  export const patchUserInfo = async (user_id) => {
    try {
      const res = await axios.patch(`${url}/${user_id}`, {
        headers: {
          'Content-Type': 'application/json',
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


