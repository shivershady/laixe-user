import { Axios } from './Axios';

export const coursesService = {
  getCourses: () => {
    return Axios.get('api/courses/all');
  },
  // Thêm API để lấy các khóa đã mua
  getBoughtCourses: () => {
    return Axios.get('api/courses/all/buyed');
  },
  GetCoursesNotPurchasedYet: () => {
    return Axios.get('api/courses/all/not-purchased-yet');
  }
};
