export const formattedDataCourse = (courses) => {
  return courses.reduce((acc, course) => {
    const courseType = course.type === 1 ? 'motorcycle' : 'car'; // Xác định loại xe
    const exams = course.exams.map(exam => ({
      id: exam.examId,
      name: exam.examName,
      price: exam.price,
      type: exam.type === 1 ? 'theory' : 'simulation', // Xác định loại thi
      questions: exam.type === 1 ? exam.questions.length : 0, // Số câu hỏi
      videos: exam.type === 2 ? exam.questions.length : 0 // Số video
    }));

    if (!acc[courseType]) {
      acc[courseType] = { title: courseType === 'motorcycle' ? "Xe máy" : "Ô tô", courses: [] };
    }
    acc[courseType].courses.push({ id: course.courseId, name: course.courseName, exams });
    return acc;
  }, {})
}