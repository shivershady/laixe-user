import React, { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { examService } from '../../services/examService';

export default function DrivingSimulator() {
  const { examId } = useParams();
  const [videoList, setVideoList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef(null);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [failedVideos, setFailedVideos] = useState([]);
  const [processedVideos, setProcessedVideos] = useState([]);

  function getYoutubeEmbedURL(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?enablejsapi=1`;
    } else {
      const embedMatch = url.match(/^(https?:\/\/)?(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) {
        return url.includes('?') ? `${url}&enablejsapi=1` : `${url}?enablejsapi=1`;
      } else {
        return null;
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
    let player;

    const onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player('youtube-player', {
        height: '100%', // Change to 100% for full height
        width: '100%',  // Change to 100% for full width
        videoId: getYoutubeVideoId(currentVideo?.content),
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      playerRef.current = player;
    };

    const onPlayerReady = (event) => {
      // Player is ready
    };

    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PAUSED) {
        handleVideoPause();
      }
    };

    if (window.YT) {
      onYouTubeIframeAPIReady();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [currentVideo]);

  const handleVideoPause = () => {
    if (playerRef.current && !processedVideos.includes(currentVideo.questionId)) {
      const currentTime = playerRef.current.getCurrentTime(); // Current time in seconds
      const { startTime, endTime } = currentVideo;

      // Function to convert HH:MM:SS to seconds
      const convertToSeconds = (time) => {
        const parts = time.split(':');
        return parts.reduce((acc, part) => (60 * acc) + parseFloat(part), 0);
      };

      // Convert startTime and endTime to seconds
      const startTimeInSeconds = convertToSeconds(startTime);
      const endTimeInSeconds = convertToSeconds(endTime);

      if (currentTime >= startTimeInSeconds && currentTime <= endTimeInSeconds) {
        setCompletedVideos(prev => [...prev, currentVideo.questionId]);
      } else {
        setFailedVideos(prev => [...prev, currentVideo.questionId]);
      }

      setProcessedVideos(prev => [...prev, currentVideo.questionId]);
    }
  };

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const progress = (completedVideos.length / videoList.length) * 100;

  return (
    <div className="p-4 mx-auto max-w-4xl min-h-[85vh]">
      <h1 className="mb-6 text-3xl font-bold text-center">Daotaolaixehd.com.vn</h1>
      <div className="mb-6">
        <div className="mb-4 bg-gray-200 aspect-video">
          <div id="youtube-player"></div>
        </div>
        <h2 className="mb-2 text-xl font-semibold">{currentVideo?.content}</h2>
        <div className="mb-2 w-full h-2.5 bg-gray-200 rounded-full">
          <div className="bg-[#5ea5d7] h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-500">Đã hoàn thành {completedVideos.length} / {videoList.length} video</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-start">
        {videoList.map((video, index) => (
          <div key={index} className="relative w-8 h-8">
            <button
              className={`w-full h-full text-xs font-bold border rounded-sm flex items-center justify-center
                ${currentVideo?.questionId === video.questionId ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}
                ${completedVideos.includes(video.questionId) ? 'border-green-500 border-2' : 'border-gray-300'}
                ${failedVideos.includes(video.questionId) ? 'border-red-500 border-2' : ''}
              `}
              onClick={() => setCurrentVideo(video)}
            >
              {index + 1}
            </button>
            {completedVideos.includes(video.questionId) && (
              <FaCheckCircle className="absolute top-0 right-0 text-green-500 text-[18px] -mt-[3px] -mr-[3px]" />
            )}
            {failedVideos.includes(video.questionId) && (
              <FaTimes className="absolute top-0 right-0 text-red-500 text-[18px] -mt-[3px] -mr-[3px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}