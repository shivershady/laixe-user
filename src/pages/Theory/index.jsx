import { useEffect, useState } from 'react';
import { FaBook, FaChevronRight } from 'react-icons/fa';

import { useParams } from 'react-router-dom'; // Thêm import useParams
import { examService } from '../../services/examService'; // Thêm import examService
import QuizApp from './components/QuizApp'; // Thêm import cho TestDialog

const Theory = () => {
  const { examId } = useParams(); // Lấy examId từ router
  const [questions, setQuestions] = useState([]); // Khởi tạo state cho questions
  const [showDialog, setShowDialog] = useState(false); // Thêm dòng này để định nghĩa showDialog
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setIsLoading(true);
        const response = await examService.getExam(examId);
        const data = await response.data.questions;
        setQuestions(data);
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
            <div className="mb-4">
              <h2 className="flex items-center text-xl font-semibold">
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-[#5ea5d7] rounded-full">
                  {index + 1}
                </span>
                {q.content}
              </h2>
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
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black">
          <QuizApp
            onClose={() => setShowDialog(false)}
            questions={questions}
          />
        </div>
      )}
    </div>
  );
};

export default Theory;