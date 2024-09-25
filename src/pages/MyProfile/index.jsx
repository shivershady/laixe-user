import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCar,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom"; // Thêm import này

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useUser } from "../../hooks/UserContext";
import { classListService } from "../../services/classListService";
import { coursesService } from "../../services/coursesService";
import { userService } from "../../services/userService";
import { formattedDataCourse } from "../../utils/formattedDataCourse";
import './Calendar.css'; // Tùy chỉnh style để làm nổi bật

export default function MyProfile() {
  const navigate = useNavigate(); // Khởi tạo navigate
  const location = useLocation(); // Khởi tạo location
  const query = new URLSearchParams(location.search); // Lấy query từ URL
  const initialTab = query.get("activeTab") || "info"; // Lấy giá trị activeTab từ query hoặc mặc định là "info"
  const [activeTab, setActiveTab] = useState(initialTab); // Sử dụng initialTab
  const { user, updateUser } = useUser();

  const [coursesData, setCoursesData] = useState({});
  const [formData, setFormData] = useState({
    userName: user.userName,
    age: user.age,
    phoneNumber: user.phoneNumber,
    email: user.email,
    address: user.address,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch class data from your API
    const fetchClassData = async () => {
      // Replace this with your actual API call
      try {
        const response = await classListService.getSchedule()
        const processedData = response.map(classItem => ({
          id: classItem.classId,
          name: classItem.className,
          startDate: new Date(classItem.startDate),
          endDate: new Date(classItem.endDate),
          scheduledDays: [classItem.day1, classItem.day2].filter(day => day !== null),
          attendanceDates: classItem.attendanceRecords
            .filter(record => record.isPresent)
            .map(record => {
              const [year, month, day] = record.attendanceDate.split('T')[0].split('-').map(Number);
              return new Date(year, month - 1, day);
            }),
          absenceDates: classItem.attendanceRecords
            .filter(record => !record.isPresent)
            .map(record => {
              const [year, month, day] = record.attendanceDate.split('T')[0].split('-').map(Number);
              return new Date(year, month - 1, day);
            })
        }));

        setClasses(processedData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchClassData();
  }, []);

  const tileClassName = ({ date, view }, classData) => {
    if (view === 'month') {
      const dateTime = date.getTime();

      if (classData.attendanceDates.some(d => d.getTime() === dateTime)) {
        return 'highlight-success';
      }

      if (classData.absenceDates.some(d => d.getTime() === dateTime)) {
        return 'highlight-error';
      }

      if (
        date >= classData.startDate &&
        date <= classData.endDate &&
        classData.scheduledDays.includes(date.getDay() === 0 ? 1 : date.getDay() + 1)
      ) {
        return 'scheduled-day';
      }
    }
    return null;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatScheduledDays = (days) => {
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return days.map(day => dayNames[day - 1]).join(', ');
  };


  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleLogOut = () => {
    updateUser(null);
    localStorage.clear("user");
  };

  const isEmailConfirmed = user.emailConfirm;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "age" && value.length > 3) return;
    if (name === "phoneNumber" && value.length > 11) return;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await userService.changeUser(formData);
      alert("cập nhật thông tin thành công");
      updateUser(response);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin.");
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      await userService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      alert("Mật khẩu đã được thay đổi thành công!");
      handleLogOut();
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Có lỗi xảy ra khi thay đổi mật khẩu.");
    }
  };

  const handlePageLearn = (exam) => {
    if (exam.type === "theory") {
      navigate(`/ly-thuyet/${exam.id}`);
    } else if (exam.type === "simulation") {
      navigate(`/mo-phong/${exam.id}`);
    }
  };

  useEffect(() => {
    const getBoughtCourses = async () => {
      try {
        const response = await coursesService.getBoughtCourses();
        setCoursesData(formattedDataCourse(response.data));
      } catch (error) {
        console.error("Error get courses:", error);
      }
    };
    getBoughtCourses();
  }, []);

  return (
    <div className="min-h-screen py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Hồ Sơ Của Tôi</h1>
        <div className="flex flex-col gap-6 md:flex-row">
          <aside className="w-full md:w-1/4">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <FaUser className="text-gray-300 w-36 h-36" />
                <h2 className="mt-4 text-xl font-semibold">{user.userName}</h2>
                <p className="text-sm text-gray-600">{user.roles[0]}</p>
              </div>
              <hr className="my-4" />
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{user.age} tuổi</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{user.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-600" />
                  <span>{user.address}</span>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center">
                <button
                  className={`flex-1 py-2 px-4 text-center bg-[#7ab9e6] text-white`}
                  onClick={handleLogOut}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="flex border-b">
                {[
                  { key: "info", label: "Thông Tin Tài Khoản" },
                  { key: "changePassword", label: "Đổi Mật Khẩu" },
                  { key: "purchasedCourses", label: "Khóa Học Đã Mua" },
                  { key: "classList", label: "Danh sách lớp học" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`flex-1 py-2 px-4 text-center ${activeTab === tab.key
                      ? "bg-[#7ab9e6] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                    onClick={() => handleTabChange(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === "info" && (
                  <div>
                    <h2 className="mb-2 text-xl font-semibold">
                      Thông Tin Tài Khoản
                    </h2>
                    <p className="mb-2 text-gray-600">
                      Cập nhật thông tin cá nhân của bạn tại đây.
                    </p>
                    <form className="space-y-4" onSubmit={handleChangeProfile}>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-1 text-sm font-medium text-gray-700"
                          >
                            Họ và Tên
                          </label>
                          <input
                            id="name"
                            name="userName"
                            type="text"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="age"
                            className="block mb-1 text-sm font-medium text-gray-700"
                          >
                            Tuổi
                          </label>
                          <input
                            id="age"
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          Số Điện Thoại
                        </label>
                        <input
                          id="phone"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          disabled={isEmailConfirmed}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          Địa Chỉ
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#7ab9e6] text-white py-1 px-3 rounded-md hover:bg-[#5ea5d7] focus:outline-none focus:ring-2 focus:ring-[#7ab9e6] focus:ring-opacity-50 h-8"
                      >
                        Lưu Thông Tin
                      </button>
                    </form>
                  </div>
                )}
                {activeTab === "changePassword" && (
                  <div>
                    <h2 className="mb-2 text-xl font-semibold">Đổi Mật Khẩu</h2>
                    <p className="mb-4 text-gray-600">
                      Cập nhật mật khẩu của bạn để bảo mật tài khoản.
                    </p>
                    <form className="space-y-4" onSubmit={handleChangePassword}>
                      <div>
                        <label
                          htmlFor="current-password"
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          Mật Khẩu Hiện Tại
                        </label>
                        <input
                          id="current-password"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          disabled={isEmailConfirmed}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="new-password"
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          Mật Khẩu Mới
                        </label>
                        <input
                          id="new-password"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          disabled={isEmailConfirmed}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="block mb-1 text-sm font-medium text-gray-700"
                        >
                          Xác Nhận Mật Khẩu Mới
                        </label>
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="block w-full h-10 px-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          disabled={isEmailConfirmed}
                        />
                      </div>
                      <button
                        type="submit"
                        className={`w-full ${!isEmailConfirmed ? 'bg-[#7ab9e6] hover:bg-[#5ea5d7] cursor-pointer' : 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed'} text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#7ab9e6] focus:ring-opacity-50 h-10`}
                        disabled={isEmailConfirmed}
                      >
                        Đổi Mật Khẩu
                      </button>
                    </form>
                  </div>
                )}
                {activeTab === "purchasedCourses" && (
                  <div>
                    <h2 className="mb-2 text-xl font-semibold">
                      Khóa Học Đã Mua
                    </h2>
                    <p className="mb-4 text-gray-600">
                      Danh sách các khóa học bạn đã đăng ký.
                    </p>
                    <div className="space-y-6">
                      {Object.entries(coursesData).map(
                        ([vehicleType, data]) => (
                          <div key={vehicleType}>
                            <h3 className="flex items-center mb-2 text-lg font-semibold">
                              {vehicleType === "car" ? (
                                <FaCar className="mr-2" />
                              ) : (
                                <FaMotorcycle className="mr-2" />
                              )}
                              {data.title}
                            </h3>
                            {data.courses.map((course) => (
                              <div key={course.id} className="mb-4">
                                <h4 className="mb-2 font-medium">
                                  {course.name}
                                </h4>
                                <ul className="space-y-2">
                                  {course.exams.map((exam) => (
                                    <li
                                      key={exam.id}
                                      className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
                                    >
                                      <span>
                                        {exam.name} (
                                        {exam.type === "theory"
                                          ? "Lý thuyết"
                                          : "Mô phỏng"}
                                        )
                                      </span>
                                      <button
                                        onClick={() => handlePageLearn(exam)}
                                        className="bg-[#7ab9e6] text-white py-1 px-3 rounded-md text-sm hover:bg-[#5ea5d7]"
                                      >
                                        Học ngay
                                      </button>
                                    </li>
                                  ))}
                                  {course.exams.length === 0 && (
                                    <li className="p-2 text-gray-500 bg-gray-100 rounded-md">
                                      Chưa có bài thi cho khóa học này
                                    </li>
                                  )}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "classList" && (
                  <div className="w-full p-6 overflow-auto bg-white rounded-lg">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {classes.map(classData => (
                        <div key={classData.id} className="p-4 border rounded-lg">
                          <h3 className="mb-2 text-lg font-semibold">{classData.name}</h3>
                          <p>Ngày bắt đầu: {formatDate(classData.startDate)}</p>
                          <p>Ngày kết thúc: {formatDate(classData.endDate)}</p>
                          <p>Học vào các ngày: {formatScheduledDays(classData.scheduledDays)}</p>
                          <div className="mx-auto mt-4 w-fit">
                            <Calendar
                              value={new Date()}
                              tileClassName={({ date, view }) => tileClassName({ date, view }, classData)}
                              minDate={classData.startDate}
                              maxDate={classData.endDate}
                            />
                          </div>
                          <Legend />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const Legend = () => (
  <div className="mt-4 text-sm">
    <h4 className="mb-2 font-semibold">Chú thích:</h4>
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2 bg-black rounded-full"></div>
        <span>Chưa điểm danh</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2 bg-red-500 rounded-full"></div>
        <span>Đã điểm danh</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 mr-2 bg-blue-500 rounded-full"></div>
        <span>Ngày học</span>
      </div>
    </div>
  </div>
);