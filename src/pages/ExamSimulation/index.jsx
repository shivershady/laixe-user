/* eslint-disable no-useless-escape */

import { useEffect, useRef, useState } from 'react';

import { FaCheckCircle } from 'react-icons/fa';
import { examService } from '../../services/examService';
import { useParams } from 'react-router-dom';

export default function DrivingSimulator() {
  const { examId } = useParams();
  const [videoList, setVideoList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  function getYoutubeEmbedURL(url) {
    // Biểu thức chính quy để tìm ID video từ các dạng URL khác nhau
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      // Nếu tìm thấy ID video hợp lệ
      return `https://www.youtube.com/embed/${match[2]}`;
    } else {
      // Nếu URL đã là dạng embed hoặc không tìm thấy ID hợp lệ
      const embedMatch = url.match(/^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) {
        return url; // Trả về nguyên URL nếu đã là dạng embed
      } else {
        return null; // Trả về null nếu không phải URL YouTube hợp lệ
      }
    }
  }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await examService.getExam(examId);
        const data = await response.data.questions;
        setVideoList(data);
        if (data.length > 0) {
          setCurrentVideo(data[0]);
          setWatchedVideos([data[0].questionId]); // Chỉ đánh dấu video đầu tiên là đã xem
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [examId]);

  useEffect(() => {
    if (currentVideo && iframeRef.current) {
      iframeRef.current.src = `${getYoutubeEmbedURL(currentVideo.content)}?autoplay=1`;
    }
  }, [currentVideo]);

  const toggleWatched = (questionId) => {
    setWatchedVideos(prev =>
      prev.includes(questionId) ? prev.filter(videoId => videoId !== questionId) : [...prev, questionId]
    );
  };

  const progress = (watchedVideos.length / videoList.length) * 100;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-4 mx-auto max-w-4xl min-h-[85vh]">
      <h1 className="mb-6 text-3xl font-bold text-center">Daotaolaixehd.com.vn</h1>
      <div className="mb-6">
        <div className="mb-4 bg-gray-200 aspect-video">
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`${currentVideo?.content}?autoplay=1`}
            title={currentVideo?.content}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h2 className="mb-2 text-xl font-semibold">{currentVideo?.content}</h2>
        <div className="mb-2 w-full h-2.5 bg-gray-200 rounded-full">
          <div className="bg-[#5ea5d7] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-500">Đã xem {watchedVideos.length} / {videoList.length} video</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-start">
        {videoList.map((video, index) => (
          <div key={index} className="relative w-8 h-8">
            <button
              className={`w-full h-full text-xs font-bold border rounded-sm flex items-center justify-center
                ${currentVideo?.questionId === video.questionId ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}
                ${watchedVideos.includes(video.questionId) ? 'border-green-500 border-2' : 'border-gray-300'}
              `}
              onClick={() => {
                setCurrentVideo(video);
                if (!watchedVideos.includes(video.questionId)) {
                  toggleWatched(video.questionId);
                }
              }}
            >
              {index + 1}
            </button>
            {watchedVideos.includes(video.questionId) && (
              <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-[18px] -mt-[3px] -mr-[3px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}