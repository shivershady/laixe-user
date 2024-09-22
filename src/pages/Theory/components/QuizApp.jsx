'use client'

import { FaBook, FaClock, FaExclamationCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';

export default function QuizApp({ onClose, questions = [] }) {
  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 phút

  useEffect(() => {
    let timer;
    if (started && !finished) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Cập nhật mỗi giây
    }
    return () => clearInterval(timer); // Dọn dẹp khi component unmount
  }, [started, finished]);

  const startQuiz = () => {
    // Trộn lại câu hỏi mỗi khi bắt đầu bài thi
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));

    setStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setFinished(false);

    // Thêm bộ đếm thời gian 20 phút
    setTimeout(() => {
      setFinished(true);
    }, 20 * 60 * 1000); // 20 phút
  }

  // Cập nhật hàm handleAnswerSelect để sử dụng answerId
  const handleAnswerSelect = (answerId) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerId
    setSelectedAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setFinished(true)
    }
  }

  // Cập nhật hàm calculateResults để xử lý trường hợp chưa chọn câu trả lời
  const calculateResults = () => {
    let correct = 0
    shuffledQuestions.forEach((q, index) => {
      const correctAnswer = q.answers.find(answer => answer.type).answerId;
      // Kiểm tra nếu người dùng đã chọn câu trả lời
      if (selectedAnswers[index] !== undefined && correctAnswer === selectedAnswers[index]) {
        correct++
      }
    })
    return correct
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }


  if (!started) {
    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">Bài Thi Thử</h2>
        <div className="max-h-[60vh] overflow-auto mb-4">
          <p className="mb-4 font-semibold text-center">Bạn đã sẵn sàng để bắt đầu bài thi thử chưa?</p>
          <div className="flex items-center mb-2 text-gray-600">
            <FaClock className="w-5 h-5 mr-2" />
            <p>Thời gian: 20 phút</p>
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <FaBook className="w-5 h-5 mr-2" />
            <p>Số câu hỏi: {questions.length} câu</p>
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <FaExclamationCircle className="w-5 h-5 mr-2" />
            <p>Yêu cầu đạt: {Math.ceil(questions.length * 0.5)}/{questions.length} câu đúng</p>
          </div>
          <p className="text-sm text-gray-600">
            Lưu ý: Bạn không thể tạm dừng bài thi sau khi đã bắt đầu. Hãy đảm bảo rằng bạn có đủ thời gian để hoàn thành bài thi.
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            onClick={startQuiz}
            className="px-4 py-2 text-white transition-colors bg-[#7ab9e6] rounded-lg hover:bg-[#5ea5d7]"
          >
            Bắt Đầu Ngay
          </button>
        </div>
      </div>
    )
  }

  if (finished) {
    const correctAnswers = calculateResults();
    return (
      <div className="min-w-[350px] mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold">Kết Quả</h2>
          <p className="mb-4">Bạn đã trả lời đúng {correctAnswers}/{shuffledQuestions.length} câu</p>
          <div className="max-h-[40vh] overflow-auto">
            {shuffledQuestions.map((q, index) => {
              const userAnswerId = selectedAnswers[index];
              const userAnswerContent = userAnswerId !== undefined
                ? q.answers.find(answer => answer.answerId === userAnswerId)?.content
                : 'Chưa chọn';

              return (
                <div key={q.questionId} className="mt-4">
                  <h3 className="font-semibold">{index + 1}. {q.content}</h3>
                  <p className="mb-2"><strong>Câu trả lời của bạn:</strong> {userAnswerContent}</p>
                  <p className="mb-2"><strong>Câu trả lời đúng:</strong> {q.answers.find(answer => answer.type).content}</p>
                  <p className="mb-2">{userAnswerId === q.answers.find(answer => answer.type).answerId ? '✅' : '❌'}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 space-x-4 bg-gray-100">
          {correctAnswers >= Math.ceil(shuffledQuestions.length * 0.5) ? (
            <>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 text-white bg-[#f3715d] rounded-md hover:bg-[#f15f48]"
              >
                Đạt
              </button>
              <button onClick={startQuiz} className="w-full px-4 py-2 text-white bg-[#7ab9e6] rounded-md hover:bg-[#5ea5d7]">Làm Lại</button>
            </>
          ) : (
            <>
              <button
                className="w-full px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-100"
                onClick={onClose}
              >
                Hủy
              </button>
              <button onClick={startQuiz} className="w-full px-4 py-2 text-white bg-[#7ab9e6] rounded-md hover:bg-[#5ea5d7]">Làm Lại</button>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  return (
    <div className="w-[350px] mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-extrabold">
          Thời gian còn lại: <span className="text-red-500">{formatTime(timeLeft)}</span>
        </h1>
        <h2 className="mb-4 text-2xl font-bold">
          Câu hỏi {currentQuestionIndex + 1}/{shuffledQuestions.length}
        </h2>
        <p className="mb-4 text-lg font-semibold">{currentQuestion.content}</p>
        <div className="space-y-2">
          {currentQuestion.answers.map((option, index) => (
            <div key={option.answerId} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option.answerId}
                checked={selectedAnswers[currentQuestionIndex] === option.answerId}
                onChange={() => handleAnswerSelect(option.answerId)}
                className="form-radio"
              />
              <label htmlFor={`option-${index}`} className="cursor-pointer">{option.content}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-100">
        <button onClick={nextQuestion} className="w-full px-4 py-2 text-white bg-[#7ab9e6] rounded-md hover:bg-[#5ea5d7]">
          {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo'}
        </button>
      </div>
    </div>
  )
}