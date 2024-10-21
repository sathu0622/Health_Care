import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function sidebar() {
  return (
    <div className="flex">
    {/* Sidebar */}
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
      HEALTH ADMIN
    </div>
    <nav className="flex-grow py-6">
      <ul className="space-y-4">
        <li className="px-6 py-2 hover:bg-gray-700">
          <Link to="/adminPanel">
            <i className="fas fa-tachometer-alt mr-2"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700">
          <Link to="/manage-hospitals">
            <i className="fas fa-procedures mr-2"></i>
            <span>Hospital</span>
          </Link>
        </li>
        <li className="px-6 py-2 hover:bg-gray-700">
            <Link to="/listreview">
              <i className="fas  mr-2"></i>
              <span>⋇ Feedback</span>
            </Link>
          </li>
      </ul>
    </nav>
  </aside>
  </div>
  )
}
