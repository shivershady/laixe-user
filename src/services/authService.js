import { Axios } from './Axios';

export const authService = {
  login: (email, password) => {
    return Axios.post('/api/login', { email, password });
  },
  googleLogin: (token) => {
    return Axios.post('/api/google-login', { token });
  }
};
