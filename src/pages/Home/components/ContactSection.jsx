import React from 'react';

function ContactSection() {
  return (
    <section className="my-8 contact-section">
      <h2 className="text-2xl font-bold text-center">Liên hệ với chúng tôi</h2>
      <form className="max-w-md mx-auto mt-4">
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">Họ và tên</label>
          <input className="w-full px-3 py-2 border rounded" type="text" id="name" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email</label>
          <input className="w-full px-3 py-2 border rounded" type="email" id="email" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="message">Tin nhắn</label>
          <textarea className="w-full px-3 py-2 border rounded" id="message" rows="4" required></textarea>
        </div>
        <button className="px-4 py-2 text-white bg-green-500 rounded" type="submit">Gửi</button>
      </form>
    </section>
  );
}

export default ContactSection;