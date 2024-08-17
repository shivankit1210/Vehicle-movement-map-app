import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputLocations = ({ onSubmit }) => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const navigate = useNavigate(); // Ensure you are using this within a router context

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startLocation, endLocation });
    navigate("/map-component"); // Navigate to the map-component route after submission
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 w-96">
      <div className="mb-4">
        <label className="block font-semibold text-lg text-gray-700">Start Location:</label>
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter start location"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-lg text-gray-700">End Location:</label>
        <input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter end location"
        />
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default InputLocations;
