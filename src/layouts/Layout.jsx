import React from 'react';

export default function Layout({ children }) {
    return (
        <div className='m-4'>
            <header className='flex items-center justify-between w-full p-4 gap-x-10 h-14 rounded-xl'>
                <h1 className='text-xl font-semibold '>Trung Tâm Đào Tạo Lái Xe</h1>
                <nav>
                    <ul className='flex space-x-4'>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/login">Đăng nhập</a></li>
                        <li><a href="/register">Đăng ký</a></li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
            <footer className='mt-4 text-center'>
                <p>&copy; 2023 Trung Tâm Đào Tạo Lái Xe. Tất cả quyền được bảo lưu.</p>
            </footer>
        </div>
    );
}
