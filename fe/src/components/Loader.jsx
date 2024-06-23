import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center min-h-screen bg-background">
    <video className="w-24 h-24" autoPlay loop muted>
      <source src="/loader-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default Loader;
