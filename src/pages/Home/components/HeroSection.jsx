import React from 'react';

function HeroSection() {
  return (
    <section className="flex items-center justify-center h-64 text-white bg-center bg-cover hero-section" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Khóa học ô tô Hạng B1 tự động</h2>
        <p className="mt-2">Đăng ký học ngay để nhận ưu đãi!</p>
        <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded">Đăng ký ngay</button>
      </div>
    </section>
  );
}

export default HeroSection;