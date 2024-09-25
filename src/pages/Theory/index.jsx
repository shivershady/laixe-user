import { useEffect, useState } from 'react';
import { FaBook, FaChevronRight } from 'react-icons/fa';

import { useParams } from 'react-router-dom';
import { examService } from '../../services/examService';
import QuizApp from './components/QuizApp';

const Theory = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(0)

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setIsLoading(true);
        const response = await examService.getExam(examId);
        const data = await response.data.questions;
        setQuestions(data.map(item => ({
          ...item,
          file: 'https://image.congan.com.vn/thumbnail/CATP-480-2023-7-21/cac-trung-tam-sat-hach-lai-xe-tai-tphcm_888_533_972.jpg'
        })));
        setTime(response.data.time)
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [examId]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container max-w-4xl p-4 mx-auto min-h-[85vh]">
      <h1 className="mb-6 text-3xl font-bold text-center">Ôn Tập Lý Thuyết Thi Lái Xe</h1>

      <div className="grid gap-6 mb-6">
        {questions.map((q, index) => (
          <div key={q.id} className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex flex-col items-center mb-4 space-y-2">
              <div className="flex-1">
                <h2 className="flex items-center text-xl font-semibold">
                  <span className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-[#5ea5d7] rounded-full">
                    {index + 1}
                  </span>
                  {q.content}
                </h2>
              </div>
              {q.file && (
                <img
                  src={q.file}
                  alt={`Question ${index + 1}`}
                  className="object-cover h-auto mr-4 rounded w-96"
                />
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              {q.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex items-center p-3 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                  <span className="mr-2 font-semibold">
                    {String.fromCharCode(65 + answerIndex)}.
                  </span>
                  {answer.content}
                </div>
              ))}
            </div>
            <div className="flex items-center text-sm font-medium">
              <FaBook className="w-4 h-4 mr-2" />
              Đáp án đúng: {String.fromCharCode(65 + q.answers.findIndex(answer => answer.type))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowDialog(true)}
        className="flex items-center justify-center w-full py-6 text-lg text-white transition-colors bg-[#5ea5d7] rounded-lg hover:bg-blue-600"
      >
        Bắt Đầu Thi Thử
        <FaChevronRight className="w-5 h-5 ml-2" />
      </button>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <QuizApp
            onClose={() => setShowDialog(false)}
            questions={questions}
            time={time}
          />
        </div>
      )}
    </div>
  );
};

export default Theory;