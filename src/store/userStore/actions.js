import { axios } from 'boot/axios';
import router from '../../router';

axios.create({ baseURL: process.env.API_URL });
const baseURL = `${process.env.API_URL}/user`;

console.log(process.env.API_URL);
export async function login({ dispatch }, payload) {
  console.log(payload, baseURL);
  let response;
  try {
    response = await axios.post(`${baseURL}/login`, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },

      email: payload.email,
      password: payload.password,
    });
    console.log(response);
    localStorage.setItem('token', 'Bearer' + ' ' + response.data.token);
    await dispatch('getUser');
    router.push('/');

    return '';
  } catch (err) {
    // console.log(err.response.data.message);

    return err.response ? err.response.data.message : err.message;
  }
}

export async function getUser({ commit }) {
  console.log('get user action');
  try {
    let response = await axios.get(`${baseURL}/get-user`, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },

      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    console.log(response);

    commit('setUserProfile', response.data.response[0]);
    return '';
  } catch (err) {
    // console.log(err.response.data.message);

    return err.response ? err.response.data.message : err.message;
  }
}

export async function registerUser({}, payload) {
  console.log(payload);
  try {
    let response = await axios.post(
      `${baseURL}/create-user`,
      {
        email: payload.email,
        name: payload.name,
        password: payload.password,
        permission: payload.permission,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    console.log(response);
    return '';
  } catch (err) {
    // console.log(err.response.data.message);

    return err.response ? err.response.data.message : err.message;
  }
}

//Logout action
export async function destroySessionAction({ commit }) {
  try {
    localStorage.removeItem('token');
    await commit('destroySession');
    router.push('/login');
    return '';
  } catch (err) {
    // console.log(err.response.data.message);

    return err.message;
  }
}

//Update password

export async function updatePasswordAction({}, payload) {
  console.log(payload);
  try {
    let response = await axios.post(
      `${baseURL}/update-password`,
      {
        old_password: payload.oldPassword,
        new_password: payload.newPassword,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    console.log(response);
    return '';
  } catch (err) {
    // console.log(err.response.data.message);

    return err.response ? err.response.data.message : err.message;
  }
}
