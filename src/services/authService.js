import { Axios } from './Axios';

export const authService = {
  login: (username, password) => {
    return Axios.post('/api/authenticates/login', { username, password });
  },
  googleLogin: (token) => {
    return Axios.get('/api/authenticates/google-response', { code: token });
  },

  register: (data) => {
    const payload = {
      password: data.password,
      username: data.name,
      email: data.email,
      phoneNumber: data.phone,
      address: data.address,
      age: data.age,
    }
    return Axios.post('/api/authenticates/register', payload);
  }
};
