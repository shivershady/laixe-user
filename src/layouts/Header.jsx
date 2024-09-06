import { FaCaretDown, FaExchangeAlt, FaFile, FaFolder, FaHome, FaPencilAlt, FaUser, FaUserPlus } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  console.log('🚀 ~ Header ~ location:', location)

  const menuItems = [
    { name: 'Trang chủ', path: '/', icon: <FaHome /> },
    {
      name: 'Mô Phỏng',
      path: '/mo-phong',
      icon: <FaFolder />,
      subItems: [
        { name: '120 tình huống mô phỏng 2.0', path: '/mo-phong/120-tinh-huong' },
        { name: 'Thi thử mô phỏng v2.0', path: '/mo-phong/thi-thu' },
        { name: 'Sổ tay giải nhanh 120 tình huống mô phỏng', path: '/mo-phong/so-tay-giai-nhanh' },
        { name: 'Tải phần mềm mô phỏng 2.0', path: '/mo-phong/tai-phan-mem' },
      ]
    },
    {
      name: 'Thi thử lý thuyết',
      path: '/thi-thu',
      icon: <FaPencilAlt />,
      subItems: [
        { name: '60 câu hỏi điểm liệt thi lý thuyết', path: '/thi-thu/60-cau-diem-liet' },
        { name: 'Thi trắc nghiệm 600 câu với khung lớn', path: '/thi-thu/600-cau-khung-lon' },
        { name: 'Thi thử bằng lái xe mô tô A1', path: '/thi-thu/bang-lai-a1' },
        { name: 'Thi lý thuyết lái xe mô tô A2 (trên 175 cc)', path: '/thi-thu/bang-lai-a2' },
        { name: 'Thi thử lý thuyết lái xe B11- tự động', path: '/thi-thu/bang-lai-b11' },
        { name: 'Thi thử bằng lái xe B2 số sàn', path: '/thi-thu/bang-lai-b2' },
        { name: 'Thi thử bằng lái xe hạng C', path: '/thi-thu/bang-lai-c' },
        { name: 'Thi thử bằng lái xe hạng D', path: '/thi-thu/bang-lai-d' },
        { name: 'Thi thử bằng lái xe hạng E', path: '/thi-thu/bang-lai-e' },
        { name: 'Thi thử bằng lái xe hạng F (FB-FC-FD-FE)', path: '/thi-thu/bang-lai-f' },
      ]
    },
    {
      name: 'Tài liệu',
      path: '/tai-lieu',
      icon: <FaFile />,
      subItems: [
        { name: 'Bộ Đề 600 Câu Học Lý Thuyết Lái Xe', path: '/tai-lieu/600-cau-ly-thuyet' },
        { name: 'Bộ Đề 200 Câu Lý Thuyết Lái Xe Máy', path: '/tai-lieu/200-cau-ly-thuyet-xe-may' },
        { name: 'Phần Mềm Ôn Thi GPLX-Bộ 600 Câu Hỏi', path: '/tai-lieu/phan-mem-on-thi-gplx' },
        { name: 'Hướng dẫn 11 bài thi sa hình sát hạch lái xe ô tô', path: '/tai-lieu/huong-dan-sa-hinh' },
        { name: 'Học bằng lái xe b2 mất bao lâu', path: '/tai-lieu/hoc-bang-lai-b2' },
        { name: 'Học bằng lái xe C mất bao lâu', path: '/tai-lieu/hoc-bang-lai-c' },
        { name: 'Hướng dẫn thi thực hành mô tô A1', path: '/tai-lieu/huong-dan-thi-thuc-hanh-a1' },
        { name: 'Biển báo hiệu', path: '/tai-lieu/bien-bao-hieu' },
        { name: 'Kỹ thuật và Tư vấn giao thông', path: '/tai-lieu/ky-thuat-tu-van-giao-thong' },
        { name: 'Quy định xử phạt vi phạm giao thông ĐB', path: '/tai-lieu/quy-dinh-xu-phat' },
      ]
    },
    {
      name: 'Đăng ký học',
      path: '/dang-ky-hoc',
      icon: <FaUserPlus />,
      subItems: [
        { name: 'Thi bằng lái xe máy', path: '/dang-ky-hoc/bang-lai-xe-may' },
        { name: 'Học bằng lái xe ô tô số tự động', path: '/dang-ky-hoc/bang-lai-xe-oto-tu-dong' },
        { name: 'Học lái xe ô tô b2', path: '/dang-ky-hoc/hoc-lai-xe-oto-b2' },
        { name: 'Học lái xe ô tô hạng C', path: '/dang-ky-hoc/hoc-lai-xe-oto-hang-c' },
        { name: 'Nâng hạng giấy phép lái xe C,D,E', path: '/dang-ky-hoc/nang-hang-gplx-cde' },
      ]
    },
    {
      name: 'Đổi + Mất GPLX',
      path: '/doi-mat-gplx',
      icon: <FaExchangeAlt />,
      subItems: [
        { name: 'Cách Tra cứu phạt nguội', path: '/doi-mat-gplx/tra-cuu-phat-nguoi' },
        { name: 'Tra cứu GPLX', path: '/doi-mat-gplx/tra-cuu-gplx' },
        { name: 'Đổi GPLX bị hỏng- Rách- mờ ảnh- mờ số', path: '/doi-mat-gplx/doi-gplx-hong-rach' },
        { name: 'Hướng dẫ đổi giấy phép lái xe A1', path: '/doi-mat-gplx/huong-dan-doi-gplx-a1' },
        { name: 'Mất giấy phép lái xe A1', path: '/doi-mat-gplx/mat-gplx-a1' },
        { name: 'Mất giấy phép lái xe B2', path: '/doi-mat-gplx/mat-gplx-b2' },
        { name: 'Mất giấy phép lái xe C', path: '/doi-mat-gplx/mat-gplx-c' },
        { name: 'Mất hồ sơ gốc lái xe máy hoặc ô tô', path: '/doi-mat-gplx/mat-ho-so-goc' },
        { name: 'Đổi giấy phép lái xe đến hạn', path: '/doi-mat-gplx/doi-gplx-den-han' },
        { name: 'Quá hạn giấy phép lái xe B2', path: '/doi-mat-gplx/qua-han-gplx-b2' },
        { name: 'Quá hạn giấy phép lái xe C', path: '/doi-mat-gplx/qua-han-gplx-c' },
        { name: 'Sai thông tin trên bằng lái xe', path: '/doi-mat-gplx/sai-thong-tin-gplx' },
      ]
    },
  ];

  return (
    <header className="py-4 w-full text-white bg-[#465663]">
      <nav className="container flex justify-between items-center mx-auto">
        <Link to="/">
          <img src="https://daotaolaixehd.com.vn/wp-content/uploads/2016/12/logopng.png" alt="Logo" className="h-10" />
        </Link>
        <ul className="flex space-x-2 text-sm">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative group"
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-1 hover:text-gray-300 transition-colors px-4 py-2 rounded-sm ${location.pathname === item.path
                  ? 'bg-[#38454f] font-bold'
                  : 'hover:bg-custom-blue-hover'
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.subItems && <FaCaretDown className="ml-1" />}
              </Link>
              {item.subItems && (
                <div className="absolute left-0 top-full invisible z-10 mt-1 w-80 rounded-sm bg-[#4b5563] group-hover:visible">
                  <div className="absolute top-[-10px] left-0 right-0 h-[10px]"></div>
                  <ul>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <Link to={subItem.path} className="block px-4 py-2 text-sm text-white hover:bg-[#364653] border border-gray-700 -mt-[1px]">
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          <li>
            <Link to="/login" className="flex items-center px-4 py-2 space-x-1 rounded-sm transition-colors hover:text-gray-300 hover:bg-custom-blue-hover">
              <FaUser />
              <span>Đăng nhập</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;