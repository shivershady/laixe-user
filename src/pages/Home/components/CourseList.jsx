import React from 'react';

const courses = [
  { id: 1, title: 'Khóa học Hạng B1', description: 'Học lái xe ô tô tự động', price: '14 triệu' },
  { id: 2, title: 'Khóa học Hạng B2', description: 'Học lái xe ô tô số sàn', price: '15 triệu' },
  { id: 3, title: 'Khóa học Hạng C', description: 'Học lái xe tải', price: '16 triệu' },
];

function CourseList() {
  return (
    <section className="my-8 course-list">
      <h2 className="text-2xl font-bold text-center">Danh sách khóa học</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
        {courses.map(course => (
          <div key={course.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="font-bold">{course.price}</p>
            <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded">Đăng ký</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CourseList;