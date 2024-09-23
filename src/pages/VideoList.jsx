import React, { useState, useEffect } from 'react';
import MkdSDK from '../utils/MkdSDK'
const VideoList = () => {
  const sdk = new MkdSDK();
  const [videos, setVideos] = useState([]);
  console.log(videos)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await sdk.callRestAPI({ page, limit: 10 }, 'PAGINATE');
        setVideos(response.list);
        setTotalPages(response.num_pages); 
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
console.log(fetchVideos())
    fetchVideos();
  }, [page]); 
  const handleNext = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className='bg-black'>
      <h1 className='text-white'>Video List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {videos.map(video => (
            <li key={video.id}>
              <h2>{video.title}</h2>
              <img src={video.photo} alt={video.title} />
              <p>Likes: {video.like}</p>
            </li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={handlePrev} disabled={page === 1}>Prev</button>
        <button onClick={handleNext} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default VideoList;
