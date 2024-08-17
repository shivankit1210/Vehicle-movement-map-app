import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MapComponent from "./components/Mapcomponent";
import Header from "./components/Header";
import InputLocations from "./components/InputLocations";
import { getCoordinatesFromLocation } from "./utils/jeoUtils";
import Navbar from "./components/Navbar";

const App = () => {
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);

  const handleLocationSubmit = async ({ startLocation, endLocation }) => {
    const startCoords = await getCoordinatesFromLocation(startLocation);
    const endCoords = await getCoordinatesFromLocation(endLocation);
    setStartPosition(startCoords);
    setEndPosition(endCoords);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <div className="flex flex-col place-content-center items-center m-2">
                <InputLocations onSubmit={handleLocationSubmit} />
                <div className="w-[50%] h-[80%] flex place-content-center items-center"></div>
              </div>
            </>
          }
        />

        <Route
          path="/map-component"
          element={
            <MapComponent
              startPosition={startPosition}
              endPosition={endPosition}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
