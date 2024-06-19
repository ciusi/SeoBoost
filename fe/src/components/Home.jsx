import React, { useState } from 'react';
import Navbar from './Navbar';
import RegistrationModal from './RegistrationModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="home">
      <Navbar />
      <div className="main-content">
        <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Home;
