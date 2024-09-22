import { FaBook, FaCar, FaCheck, FaDesktop, FaMotorcycle, FaQuestionCircle, FaShoppingCart, FaVideo } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import { coursesService } from '../../services/coursesService'; // Thêm import coursesService
import { formattedDataCourse } from '../../utils/formattedDataCourse';
import { vnpayService } from '../../services/vnpayService'; // Thêm import vnpayService

export default function DrivingCourses() {
  const [selectedCourses, setSelectedCourses] = useState({});
  const [activeTab, setActiveTab] = useState("motorcycle");
  const [coursesData, setCoursesData] = useState({}); // Khởi tạo state cho coursesData

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await coursesService.getCourses(); // Gọi API để lấy dữ liệu khóa học
      console.log('🚀 ~ fetchCourses ~ response:', response)
      setCoursesData(formattedDataCourse(response.data)); // Cập nhật state với dữ liệu đã định dạng
    };
    fetchCourses();
  }, []); // Chạy một lần khi component được mount

  const handlePurchase = (category, courseId, type, examId, course) => {
    setSelectedCourses(prev => {
      const currentSelection = prev[category]?.[courseId] || {};
      const price = currentSelection[type]?.price || (type === 'theory' ? course.exams.find(exam => exam.type === 'theory')?.price : course.exams.find(exam => exam.type === 'simulation')?.price);
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [courseId]: {
            ...currentSelection,
            [type]: {
              selected: !currentSelection[type]?.selected, // Chuyển đổi trạng thái chọn
              examId: examId, // Thêm examId
              price: price // Thêm giá khóa học
            }
          }
        }
      };
    });
  };

  const handleSubmit = async () => {
    // Tính tổng amount và lấy danh sách examIds
    const amount = Object.values(selectedCourses).reduce((total, category) => {
      return total + Object.values(category).reduce((catTotal, course) => {
        return catTotal + (course.theory?.selected ? (course.theory.price || 0) : 0) + (course.simulation?.selected ? (course.simulation.price || 0) : 0);
      }, 0);
    }, 0);

    const examIds = Object.values(selectedCourses).flatMap(category =>
      Object.values(category).flatMap(course => [
        course.theory?.selected ? course.theory.examId : undefined, // Sử dụng undefined thay vì null
        course.simulation?.selected ? course.simulation.examId : undefined // Sử dụng undefined thay vì null
      ])
    ).filter(id => id !== undefined); // Loại bỏ các item có giá trị undefined

    const payload = {
      orderType: "billpayment",
      amount: amount, // Cập nhật amount
      orderDescription: "Thanh toán đơn hàng",
      name: "CustomerName",
      url: window.location.href + '/payment-success', // Cập nhật url
      examIds: examIds, // Cập nhật examIds
    };

    try {
      const response = await vnpayService.createPaymentUrl(payload);
      console.log("Payment URL created:", response.paymentUrl);
      window.open(response.paymentUrl, "_blank"); // Mở đường dẫn trong tab mới
      // Xử lý logic sau khi tạo URL thanh toán thành công
    } catch (error) {
      console.error("Error creating payment URL:", error);
      // Xử lý lỗi nếu có
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const isAnyCourseSelected = Object.values(selectedCourses).some(category =>
    Object.values(category).some(course => course.theory?.selected || course.simulation?.selected)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="py-16 text-white bg-[#5ea5d7]">
        <div className="container px-4 mx-auto">
          <h1 className="mb-1 text-2xl font-bold md:text-3xl">Khóa Học Lái Xe Chuyên Nghiệp</h1>
          <p className="text-base opacity-90 md:text-lg">Đào tạo lái xe an toàn và tự tin cho mọi người</p>
        </div>
      </header>

      <main className="container px-4 py-12 mx-auto">
        <div className="mb-8 w-full">
          <div className="grid grid-cols-2 mb-4 w-full">
            {Object.entries(coursesData).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-lg py-3 ${activeTab === key
                  ? "bg-[#5ea5d7] text-white"
                  : "bg-gray-200 text-gray-700"
                  } flex items-center justify-center`}
              >
                {key === "motorcycle" ? (
                  <FaMotorcycle className="mr-2" />
                ) : (
                  <FaCar className="mr-2" />
                )}
                {title}
              </button>
            ))}
          </div>
        </div>

        {Object.entries(coursesData).map(([key, { title, courses }]) => (
          <div key={key} className={activeTab === key ? "block" : "hidden"}>
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course) => (
                <div key={course.id} className="overflow-hidden bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
                  <div className="p-6 bg-gray-100">
                    <h3 className="flex items-center text-lg font-bold">
                      {key === "motorcycle" ? (
                        <FaMotorcycle className="mr-2" />
                      ) : (
                        <FaCar className="mr-2" />
                      )}
                      {course.name}
                    </h3>
                    <p className="mt-1 text-gray-600">{course.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FaBook className="mr-2 text-[#5ea5d7]" />
                          <span className="font-semibold">
                            {course.exams.find(exam => exam.type === 'theory')?.name || "Lý thuyết"}
                          </span>
                        </div>
                        <span className="flex items-center px-1 py-1 text-xs text-gray-700 bg-gray-200 rounded-full">
                          <FaQuestionCircle className="mr-1" />
                          {course.exams.find(exam => exam.type === 'theory')?.questions || 0} câu hỏi
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FaDesktop className="mr-2 text-[#5ea5d7]" />
                          <span className="font-semibold">
                            {course.exams.find(exam => exam.type === 'simulation')?.name || "Mô phỏng"}
                          </span>
                        </div>
                        <span className="flex items-center px-1 py-1 text-xs text-gray-700 bg-gray-200 rounded-full">
                          <FaVideo className="mr-1" />
                          {course.exams.find(exam => exam.type === 'simulation')?.videos || 0} video
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-200">
                    <div className="flex justify-between mb-4 w-full">
                      <button
                        className={`flex-1 mr-1 py-1 px-2 rounded ${selectedCourses[key]?.[course.id]?.theory?.selected
                          ? "bg-[#5ea5d7] text-white"
                          : "bg-gray-200 text-gray-700"
                          }`}
                        onClick={() => handlePurchase(key, course.id, 'theory', course.exams.find(exam => exam.type === 'theory')?.id, course)}
                      >
                        <FaBook className="inline-block mr-2" />
                        <div className='inline-block space-x-1'>
                          <span>{selectedCourses[key]?.[course.id]?.theory?.selected ? "Đã chọn" : "Lý thuyết"}</span>
                          <span className="ml-auto">{course.exams.find(exam => exam.type === 'theory')?.price ? formatPrice(course.exams.find(exam => exam.type === 'theory').price) : 0}</span>
                        </div>
                      </button>
                      <button
                        className={`flex-1 ml-1 py-1 px-2 rounded ${selectedCourses[key]?.[course.id]?.simulation?.selected
                          ? "bg-[#5ea5d7] text-white"
                          : "bg-gray-200 text-gray-700"
                          }`}
                        onClick={() => handlePurchase(key, course.id, 'simulation', course.exams.find(exam => exam.type === 'simulation')?.id, course)}
                      >
                        <FaDesktop className="inline-block mr-2" />
                        <div className='inline-block space-x-1'>
                          <span>{selectedCourses[key]?.[course.id]?.simulation ? "Đã chọn" : "Mô phỏng"}</span>
                          <span className="ml-auto">{course.exams.find(exam => exam.type === 'simulation')?.price ? formatPrice(course.exams.find(exam => exam.type === 'simulation').price) : 0}</span>
                        </div>
                      </button>
                    </div>
                    <button
                      className={`w-full py-1 px-2 rounded ${selectedCourses[key]?.[course.id]?.theory?.selected && selectedCourses[key]?.[course.id]?.simulation?.selected
                        ? "bg-[#f3715d] text-white"
                        : "bg-[#5ea5d7] text-white"
                        }`}
                      onClick={() => {
                        const theorySelected = selectedCourses[key]?.[course.id]?.theory?.selected;
                        const simulationSelected = selectedCourses[key]?.[course.id]?.simulation?.selected;
                        if ((theorySelected && simulationSelected) || (!theorySelected && !simulationSelected)) {
                          handlePurchase(key, course.id, 'theory', course.exams.find(exam => exam.type === 'theory')?.id, course);
                          handlePurchase(key, course.id, 'simulation', course.exams.find(exam => exam.type === 'simulation')?.id, course);
                        } else if (!theorySelected && simulationSelected) {
                          handlePurchase(key, course.id, 'theory', course.exams.find(exam => exam.type === 'theory')?.id, course);
                        } else if (theorySelected && !simulationSelected) {
                          handlePurchase(key, course.id, 'simulation', course.exams.find(exam => exam.type === 'simulation')?.id, course);
                        }
                      }}
                    >
                      <FaShoppingCart className="inline-block mr-2" />
                      <div className='inline-block space-x-1'>
                        <span>{selectedCourses[key]?.[course.id]?.theory?.selected && selectedCourses[key]?.[course.id]?.simulation?.selected ? "Đã chọn cả hai" : "Chọn cả hai"}</span>
                        <span className="ml-auto">
                          {formatPrice((course.exams.find(exam => exam.type === 'theory')?.price || 0) + (course.exams.find(exam => exam.type === 'simulation')?.price || 0)) || 0}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {isAnyCourseSelected && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 text-lg text-white transition-colors bg-[#f3715d] rounded-lg hover:bg-[#f15f48]"
            >
              <FaCheck className="inline-block mr-2" />
              Đăng ký khóa học
            </button>
          </div>
        )}
      </main>
    </div>
  );
}