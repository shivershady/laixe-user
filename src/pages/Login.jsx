import { Link, useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { authService } from '../services/authService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authService.login(email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                navigate('/');
            } else {
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
            }
        } catch (error) {
            setError('Đăng nhập thất bại. Vui lòng thử lại sau.');
            console.error('Lỗi đăng nhập:', error);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const response = await authService.googleLogin(credentialResponse.credential);
            if (response.token) {
                localStorage.setItem('token', response.token);
                navigate('/');
            } else {
                setError('Đăng nhập Google thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            setError('Đăng nhập Google thất bại. Vui lòng thử lại sau.');
            console.error('Lỗi đăng nhập Google:', error);
        }
    };

    const handleGoogleLoginError = () => {
        setError('Đăng nhập Google thất bại. Vui lòng thử lại.');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-8 space-y-6 w-full max-w-md bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
                <p className="text-sm text-center text-gray-600">
                    Nhập thông tin đăng nhập của bạn để truy cập tài khoản
                </p>

                {error && <p className="text-sm text-center text-red-600">{error}</p>}

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-3 py-2 mt-1 w-full text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="px-3 py-2 mt-1 w-full text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 w-full text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Đăng nhập
                    </button>

                    {/* <p className="text-sm text-center text-gray-600">
                        <Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">Quên mật khẩu?</Link>
                    </p> */}
                </form>

                <div className="relative">
                    <div className="flex absolute inset-0 items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="flex relative justify-center text-sm">
                        <span className="px-2 text-gray-500 bg-white">HOẶC TIẾP TỤC VỚI</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        useOneTap
                    />
                </div>

                <p className="text-sm text-center text-gray-600">
                    Chưa có tài khoản? <Link to="/register" className="font-medium text-blue-600 hover:underline">Đăng ký</Link>
                </p>
            </div>
        </div>
    );
}
