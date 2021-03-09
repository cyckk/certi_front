import { axios } from 'boot/axios';

export function setNavigationType({ commit }, payload) {
  commit('setNavigationType', payload);
}

export async function saveLog({}, payload) {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/logs/create-logs`,
      {
        sent_from: payload.from,
        sent_to: payload.to,
        message: payload.message,
      },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
