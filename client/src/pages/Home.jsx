import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }

  return (

    <div className="h-screen bg-gradient-to-r from-blue-50 to-indigo-100">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-5">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-indigo-600">
          MeetEx
        </h1>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
        >
          Logout ({name})
        </button>

      </div>


      {/* Main Section */}
      <div className="flex flex-col justify-center items-start h-[70%] px-20">

        <h2 className="text-xl text-indigo-600 mb-3">
          Welcome! {name},
        </h2>

        <p className="text-2xl mb-6 text-gray-700">
Connect Without Limits: Upgrade your meetings with simple, secure,
 next-generation video conferencing.
 </p>


        {/* New Meeting */}
        <div className="flex gap-3 mb-4">

          <input
            type="text"
            placeholder="Name your meet..."
            className="border px-3 py-2 rounded"
          />

          <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
            New Meet
          </button>

        </div>


        <p className="text-gray-500 mb-3">or</p>


        {/* Join Meeting */}
        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter code..."
            className="border px-3 py-2 rounded"
          />

          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Join Meet
          </button>

        </div>

      </div>

    </div>

  );
};

export default Home;
