import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUsers,
  FaChartBar,
  FaEnvelope,
  FaUserPlus,
  FaUserCircle,
} from "react-icons/fa";
import com1logo from './assest/com1logo.png';

const Navbar = () => {
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showInviteDropdown, setShowInviteDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.fullName) {
      setFullName(storedUserData.fullName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setFullName("");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4 shadow-md">
      {isLoggedIn && (
        <>
          <div className="flex items-center">
            <img src={com1logo} alt="Zidio Logo" className="h-10 w-10 rounded-full" />
          </div>

          <div className="flex space-x-6 items-center">
            <div className="relative">
              <button
                onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <span>People</span> <FaUsers />
              </button>
              {showPeopleDropdown && (
                <div className="absolute bg-white text-black shadow-lg p-2 rounded-md mt-2">
                  <button className="block px-4 py-2">View People</button>
                  <button className="block px-4 py-2">Manage Teams</button>
                  <button className="block px-4 py-2">Add People</button>
                </div>
              )}
            </div>

            {/* Updated Report Button */}
            <Link to="/report" className="flex items-center space-x-2 hover:text-gray-300">
              <span>Report</span> <FaChartBar />
            </Link>

            <Link to="/Communication1" className="hover:text-gray-300">
              <FaEnvelope title="Communication1" />
            </Link>

            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="px-2 py-1 rounded-md text-black focus:outline-none"
              />
              <FaSearch className="absolute right-2 text-gray-500" />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowInviteDropdown(!showInviteDropdown)}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <span>Invite</span> <FaUserPlus />
              </button>
              {showInviteDropdown && (
                <div className="absolute bg-white text-black shadow-lg p-2 rounded-md mt-2">
                  <button className="block px-4 py-2">Invite via Email</button>
                  <button className="block px-4 py-2">Invite via Link</button>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <FaUserCircle
              className="text-3xl cursor-pointer hover:text-gray-300"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            />
            {showUserDropdown && (
              <div className="absolute right-0 bg-white text-black shadow-lg p-2 rounded-md mt-2 w-40">
                <p className="px-4 py-2">Hi, {fullName}!</p>
                <hr />
                <p className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => navigate("/settings")}>
                  Settings
                </p>
                <p className="px-4 py-2 cursor-pointer hover:bg-red-200 text-red-600" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
