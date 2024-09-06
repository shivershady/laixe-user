import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className='min-h-screen'>
            <Header />
            <main >{children}</main>
            <footer className='p-4 mt-4 text-center text-white bg-[#465663] flex justify-center space-x-10'>
                <p>Trung tâm học lái xe tại Hải Dương - Học lái xe máy - Học lái xe ô tô số tự động - học lái xe ô tô số sàn</p>
                <p>Học lái xe số tự động - Học bằng B2 - Học bằng C - Học lái xe uy tín</p>
            </footer>
        </div>
    );
}
