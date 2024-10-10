import { Axios } from './Axios';

export const socketService = {
  getHistory: (id) => {
    return Axios.get(`/api/groupchat/history/${id}`);
  },
};
