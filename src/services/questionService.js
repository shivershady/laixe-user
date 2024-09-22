import { Axios } from './Axios';

export const examService = {
  getExams: (id) => {
    return Axios.get(`/api/exams/${id}`);
  },
};
