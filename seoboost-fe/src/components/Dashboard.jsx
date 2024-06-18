import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <Link to="/audit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Run PageSpeed Audit
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
