import React from 'react';

function AboutSection() {
  return (
    <section className="my-8 about-section">
      <h2 className="text-2xl font-bold text-center">Tại sao chọn chúng tôi?</h2>
      <p className="mt-4 text-center">
        Trung tâm đào tạo lái xe với 15 năm kinh nghiệm, đội ngũ giáo viên chuyên nghiệp, cơ sở vật chất hiện đại.
      </p>
      <ul className="mt-4 list-disc list-inside">
        <li>Cơ sở vật chất đạt tiêu chuẩn ISO:9001:2015</li>
        <li>Giáo viên có nhiều năm kinh nghiệm</li>
        <li>Chương trình học linh hoạt, phù hợp với nhu cầu học viên</li>
      </ul>
    </section>
  );
}

export default AboutSection;