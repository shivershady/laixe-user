import { useEffect, useState } from 'react';
import { FaBook, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom'; // Thêm import useHistory

import { useUser } from '../../hooks/UserContext';
import { examService } from '../../services/examService';
import { userService } from '../../services/userService';

export default function PaymentSuccess() {
  const location = useLocation(); // Khai báo useLocation
  const navigate = useNavigate();
  const [totalAmount, settotalAmount] = useState(0)
  const [success, setSuccess] = useState(true)
  const [courses, setCourses] = useState([])
  const { updateUser } = useUser();

  const fetchUserInfo = async () => {
    try {
      const response = await userService.getUserInfo();
      localStorage.setItem('user', JSON.stringify(response));
      updateUser(response)
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    settotalAmount(query.get('vnp_Amount'))

    const transactionStatus = query.get('vnp_TransactionStatus');

    const success = transactionStatus === '00';
    setSuccess(success)
    if (success) {
      fetchUserInfo()
    }

    const getData = async () => {
      try {
        const response = await examService.examRegistration({
          success
        })
        setCourses(response)
      } catch (error) {
        navigate('/')
      }
    }
    getData()
  }, [location]);

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-gray-100">
      <div className="overflow-hidden w-full max-w-2xl bg-white rounded-lg shadow-md">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {success ? (
              <FaCheckCircle className="w-12 h-12 text-green-500" />
            ) : (
              <FaTimes className="w-12 h-12 text-red-500" /> // Thay icon nếu success là false
            )}
          </div>
          <h2 className="text-2xl font-bold">Thanh toán {success ? 'thành công' : 'thất bại'}!</h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="text-center text-gray-600">
            Cảm ơn bạn đã mua khóa học của chúng tôi.
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-2 font-semibold">Chi tiết đơn hàng:</h3>
            <div className="mt-2">
              <h4 className="mb-1 font-medium">Các khóa học đã mua:</h4>
              <ul className="space-y-1 list-disc list-inside">
                {courses.map(course => (
                  <li key={course.id}>
                    {course.examName} - {course.price.toLocaleString('vi-VN')} VNĐ
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2"><span className="font-medium">Tổng cộng:</span> {totalAmount.toLocaleString('vi-VN')} VNĐ</p>
          </div>
        </div>
        <div className="px-6 py-4 space-y-2">
          <button
            className="flex justify-center items-center px-4 py-2 w-full font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => navigate('/my-profile?activeTab=purchasedCourses')} // Chuyển hướng đến trang khóa học
          >
            <FaBook className="mr-2" />
            Xem tất cả khóa học
          </button>
          <button
            className="px-4 py-2 w-full font-semibold text-gray-800 bg-white rounded border border-gray-400 shadow hover:bg-gray-100"
            onClick={() => navigate('/')} // Chuyển hướng về trang chủ
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}