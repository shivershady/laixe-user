import { Axios } from './Axios';

export const examService = {
  getExams: () => {
    return Axios.get(`/api/exams`);
  },
  getExam: (id) => {
    return Axios.get(`/api/exams/${id}`);
  },
  examRegistration: (payload) => {
    return Axios.post(`/api/register/register`, payload);
  }
};
