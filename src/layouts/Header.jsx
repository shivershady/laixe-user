import { useEffect, useState } from 'react';
import { FaCaretDown, FaFolder, FaHome, FaPencilAlt, FaUser, FaUserPlus } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { examService } from '../services/examService';
import { userService } from '../services/userService';

function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // Khởi tạo navigate
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserInfo = async () => {
      try {
        const response = await userService.getUserInfo();
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const fetchExams = async () => {
      try {
        const response = await examService.getExams();
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    if (token) {
      fetchUserInfo();
    }
    fetchExams();
  }, []);

  const menuItems = [
    { name: 'Trang chủ', path: '/', icon: <FaHome /> },
    {
      name: 'Mô Phỏng',
      icon: <FaFolder />,
      subItems: exams.filter(exam => exam.type === 2).map(exam => ({
        name: exam.examName,
        path: `/mo-phong/${exam.examId}`,
      })),
    },
    {
      name: 'Lý thuyết',
      icon: <FaPencilAlt />,
      subItems: exams.filter(exam => exam.type === 1).map(exam => ({
        name: exam.examName,
        path: `/ly-thuyet/${exam.examId}`,
      })),
    },
    {
      name: 'Mua ký học',
      path: '/mua-ky-hoc',
      icon: <FaUserPlus />,
    },
  ];

  const handleSubItemClick = (examId, path) => {
    if (!user) {
      // Redirect to login if user is not logged in
      navigate('/login');
    } else {
      const registeredExam = user.registeredExams.find(exam => exam.examId == examId);
      if (registeredExam) {
        navigate(path);
      } else {
        navigate(`/purchase`);
      }
    }
  };

  return (
    <header className="py-4 w-full text-white bg-[#465663]">
      <nav className="container flex items-center justify-between mx-auto">
        <Link to="/">
          <img src="https://daotaolaixehd.com.vn/wp-content/uploads/2016/12/logopng.png" alt="Logo" className="h-10" />
        </Link>
        <ul className="flex space-x-2 text-sm">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
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
                <div className="absolute left-0 top-full invisible z-10 mt-1 rounded-sm bg-[#4b5563] group-hover:visible">
                  <div className="absolute top-[-10px] left-0 right-0 h-[10px]"></div>
                  <ul>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <button onClick={() => handleSubItemClick(subItem.path.split('/').pop(), subItem.path)} className="text-start whitespace-nowrap w-full block px-4 py-2 text-sm text-white hover:bg-[#364653] border border-gray-700 -mt-[1px]">
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          {user ? (
            <li>
              <span className="flex items-center px-4 py-2 space-x-1 rounded-sm">
                <FaUser />
                <span>{user.userName}</span>
              </span>
            </li>
          ) : (
            <li>
              <Link to="/login" className="flex items-center px-4 py-2 space-x-1 transition-colors rounded-sm hover:text-gray-300 hover:bg-custom-blue-hover">
                <FaUser />
                <span>Đăng nhập</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;