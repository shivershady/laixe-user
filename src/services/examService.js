import { Axios } from './Axios';

export const examService = {
  getExams: () => {
    return Axios.get('/api/exams');
  },
};
