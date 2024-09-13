import { Axios } from './Axios';

export const userService = {
  getUserInfo: () => {
    return Axios.get('api/users/my-info');
  },
};
