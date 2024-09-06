import { FaBook, FaClock, FaEnvelope, FaFacebook, FaGraduationCap, FaIdCard, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";

import { SiZalo } from "react-icons/si";

export default function DrivingSchoolLayout() {
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* About Us */}
        <div>
          {/* Social Media Buttons */}
          <div className="flex gap-2 mb-4">
            <button className="px-4 py-2 m-4 text-white bg-blue-600 rounded-sm hover:bg-blue-700">
              Chia sẻ Facebook
            </button>
            <button className="px-4 py-2 text-white bg-blue-400 rounded-sm hover:bg-blue-500 shrink-0 h-fit w-fit">
              <SiZalo className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="mb-8 ml-[20%]">
            <img src="https://daotaolaixehd.com.vn/wp-content/uploads/2024/08/log_636721923045379889.png" alt="Lập Phương Thành Logo" width={200} height={100} />
          </div>
          <h2 className="mb-4 text-xl font-bold">Trung tâm sát hạch lập phương Thành</h2>
          <p className="mb-4 text-sm">
            Trung tâm sát hạch lập phương Thành là một trong những đơn vị đào tạo lái xe ô tô uy tín nhất tại Hải Dương. Sau 15 năm thành công tốt nhất của Trung tâm được tạo bởi chính là việc dạy lái xe an toàn, am hiểu luật GTĐB của hơn 100.000 học viên sau khi kết thúc khóa học lái xe ô tô. Tận tâm chăm sóc những học viên đã đăng ký thi bằng lái xe tại đây, mang lại những lợi ích tốt nhất cho học viên là những gì Trung tâm luôn theo đuổi. Chúng tôi tự hào đang khẳng định mình là điểm đến tin tưởng nhất cho học viên học lái xe B1,B2, C không chỉ tại Hải Dương mà còn ở các tỉnh lân cận.
          </p>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Tại sao chọn chúng tôi?</h2>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>Cơ sở vật chất khang trang và đạt chuẩn theo quy định ISO 9001:2015</li>
            <li>Giáo viên của chúng tôi là những người có phẩm chất đạo đức tốt, nhiều năm kinh nghiệm, nhiệt tình, chuyên nghiệp, trình độ cao.</li>
            <li>Trang thiết bị giảng dạy theo chuẩn</li>
            <li>Chủ động nắm bắt thông tin khóa học</li>
            <li>Học và thi trực tuyến mọi lúc, mọi nơi</li>
            <li>Điều chỉnh thời gian học linh hoạt. Chúng tôi đào tạo cả thứ 7 hoặc chủ nhật, ngoài giờ để phù hợp với công việc và học tập của bạn.</li>
          </ul>
        </div>

        {/* Our Commitments */}
        <div className="col-span-2">
          <h2 className="mb-4 text-xl font-bold">Chúng tôi cam kết khi học lái xe tại Trung tâm :</h2>
          <ul className="space-y-2 text-sm list-disc list-inside">
            <li>Học phí niêm yết công khai. Học viên nộp học phí trực tiếp tại phòng kế toán của trung tâm và nhận lại biên lai sau khi nộp. Học phí có thể nộp học phí làm 2 đợt.</li>
            <li>Không phát sinh chi phí khi học. Nhiều học viên lo lắng trong lúc học sẽ phát sinh các khoản phí không mong muốn như : đổ xăng, chi phí này, ăn uống, giáo viên vòi vĩnh... Và chúng tôi cam kết khi bạn học lái xe tại Trung tâm sẽ không phát sinh bất kỳ khoản phí nào trong quá trình học.</li>
            <li>Thời gian đào tạo lái xe theo quy định: Hạng B1 là 3 tháng ; Hạng B2 là 3 tháng; Hạng C là 5 tháng. Chúng tôi công khai lịch học và thi trên trang web giúp học viên tiện theo dõi.</li>
            <li>Giáo viên nhiệt tình- chu đáo- trình độ cao- khả năng sư phạm tốt- sử dụng công nghệ vào giảng dạy.</li>
            <li>Ứng dụng công nghệ vào học trực tuyến như : sử dụng các bài giảng online lý thuyết, chia sẻ hình ảnh trực quan các bài tập thực hành bằng các phần mềm dạy học.</li>
            <li>Xe tập lái sử dụng học thực hành theo đúng hạng xe thi.</li>
            <li>Sân tập và thi theo tiêu chuẩn ISO:9001:2015.</li>
          </ul>
        </div>
      </div>

      {/* Image Links */}
      <div className="grid grid-cols-1 gap-4 my-8 space-x-16 md:grid-cols-3">
        <img src="https://daotaolaixehd.com.vn/wp-content/uploads/2017/01/anh1-300x113.jpg" alt="Thi trắc nghiệm" width={400} height={200} />
        <img src="https://daotaolaixehd.com.vn/wp-content/uploads/2017/01/anh2-300x113.jpg" alt="Bộ đề thi" width={400} height={200} />
        <img src="https://daotaolaixehd.com.vn/wp-content/uploads/2017/01/anh3-300x113.jpg" alt="Lịch học" width={400} height={200} />
      </div>

      {/* Footer Information */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Instructor */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Giáo viên hướng dẫn</h3>
          <div className="flex items-center space-x-4">
            <div className="overflow-hidden w-20 h-20 rounded-full"><img src="https://daotaolaixehd.com.vn/wp-content/uploads/2016/11/phambang3.jpg" alt="GV. Phạm Văn Bằng" className="object-cover w-full h-full" /></div>
            <div className="text-sm">
              <p className="flex items-center font-semibold"><FaUser className="mr-2" /> GV: Phạm Văn Bằng</p>
              <p className="flex items-center"><FaBook className="mr-2" /> Giáo viên lý thuyết + Thực hành lái xe</p>
              <p className="flex items-center"><FaGraduationCap className="mr-2" /> Trình độ: Đại Học</p>
              <p className="flex items-center"><FaIdCard className="mr-2" /> GPLX: Hạng E</p>
              <p className="flex items-center"><FaClock className="mr-2" /> Kinh nghiệm: trên 13 năm</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Liên hệ với chúng tôi</h3>
          <div className="text-sm">
            <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> Địa chỉ: 822 Lê Thanh Nghị - Hải Tân - Tp.Hải Dương</p>
            <p className="flex items-center"><FaPhone className="mr-2" /> Điện thoại: 0987756894 - (Mr. Bằng)</p>
            <p className="flex items-center"><FaFacebook className="mr-2" /> /hoclaixehaiduong</p>
            <p className="flex items-center"><FaEnvelope className="mr-2" /> phambangdlk4@gmail.com</p>
            <p className="flex items-center"><SiZalo className="mr-2" /> 0987756894</p>
          </div>
          <div className="flex mt-2 space-x-2 text-sm">
            <button className="flex items-center px-2 py-1 bg-[#33809e] text-white rounded-sm" ><FaPhone className="mr-2 w-4 h-4" /> Gọi điện</button>
            <button className="flex items-center px-2 py-1 bg-[#33809e] text-white rounded-sm" ><SiZalo className="mr-2 w-4 h-4" /> Chat Zalo</button>
            <button className="flex items-center px-2 py-1 bg-[#33809e] text-white rounded-sm" ><FaFacebook className="mr-2 w-4 h-4" /> Chat Facebook</button>
          </div>
        </div>

        {/* Pricing */}
        <div className="col-span-2">
          <h3 className="mb-2 text-lg font-semibold">Giá học phí học lái xe các hạng:</h3>
          <div className="text-sm">
            <p className="mb-2">Giá học phí học lái xe các hạng lái xe được niêm yết công khai trước cổng hoặc khu vực đăng ký. Học viên nhận hóa đơn đóng tiền sau khi đóng học phí. Đối với ô tô học viên có thể đóng học phí làm 02 đợt, một lần đầu và một lần cuối.</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Học bằng ô tô B11 số tự động học phí toàn khóa là: 14tr000 đ.</li>
              <li>Học bằng ô tô B2 học phí toàn khóa là : 13tr500 đ.</li>
              <li>Học bằng ô tô C học phí toàn khóa là : 16tr500 đ.</li>
              <li>Học phí mô tô A1 : 660.000 đ</li>
            </ul>
            <p className="mt-2">Trong quá trình học, học viên không mất thêm bất kỳ chi phí nào liên quan đến xe tập lái, xăng dầu đổ vào xe, tiền rửa xe, thay dầu xe, ăn uống, thầy cô... Cam kết hoàn tiền nếu phát sinh chi phí trong quá trình học.</p>
          </div>
        </div>
      </div>
    </div>
  )
}