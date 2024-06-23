import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-main text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <img src="/logoseoboost-light.png" alt="SeoBoost Logo" className="mx-auto h-12" />
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} SeoBoost. All Rights Reserved.</p>
        <div className="mt-2">
          <a href="/cookie" className="text-gray-400 hover:text-white mx-2">Cookie Policy</a>
          <a href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
