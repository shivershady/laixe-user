import { Axios } from './Axios';

export const classListService = {
  getSchedule: () => {
    return Axios.get(`/api/Class/attendance-schedule`);
  },
};
