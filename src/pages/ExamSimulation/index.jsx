import React, { useState } from 'react'

export default function DrivingSimulator() {
  const videoList = [
    { id: 'VIDEO_ID_1', title: 'Tình huống 1: Lái xe trong thành phố' },
    { id: 'VIDEO_ID_2', title: 'Tình huống 2: Lái xe trên đường cao tốc' },
    { id: 'VIDEO_ID_3', title: 'Tình huống 3: Đỗ xe song song' },
    { id: 'VIDEO_ID_4', title: 'Tình huống 4: Xử lý tình huống khẩn cấp' },
  ]
  const [currentVideo, setCurrentVideo] = useState(videoList[0])

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Daotaolaixehd.com.vn</h1>

      <div className="mb-6">
        {/* Video player */}
        <div className="mb-2 aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/lGlb_65t76I`}
            title={currentVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[600px] rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* Control panel */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-10 gap-2 mb-4 sm:grid-cols-15 md:grid-cols-20">
          {videoList.map((_, i) => (
            <button key={i} className="p-1 text-xs text-white bg-blue-500 rounded">
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}