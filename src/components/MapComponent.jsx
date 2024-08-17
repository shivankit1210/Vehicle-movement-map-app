import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import vehicleIconUrl from "../assets/vehicle.png";
import greenFlagIconUrl from "../assets/greenFlag.png"; // Green flag icon
import redFlagIconUrl from "../assets/redFlag.png"; // Red flag icon

// Vehicle icon definition
const vehicleIcon = new L.Icon({
  iconUrl: vehicleIconUrl,
  iconSize: [35, 35],
});

// Green flag icon for start position
const startFlagIcon = new L.Icon({
  iconUrl: greenFlagIconUrl,
  iconSize: [35, 35],
});

// Red flag icon for end position
const endFlagIcon = new L.Icon({
  iconUrl: redFlagIconUrl,
  iconSize: [35, 35],
});

const MapComponent = ({ startPosition, endPosition }) => {
  const [path, setPath] = useState([]);
  const [vehiclePosition, setVehiclePosition] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [startLocationName, setStartLocationName] = useState("Loading..."); //  for start location name
  const [endLocationName, setEndLocationName] = useState("Loading..."); //  for end location name
  const [vehicleLocationName, setVehicleLocationName] = useState("Loading...");



  useEffect(() => {
    const fetchLocationName = async (lat, lng, setLocationName) => {
      // <--- Added function for reverse geocoding
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        setLocationName(response.data.display_name);
      } catch (error) {
        setLocationName("Unknown location");
      }
    };



    if (startPosition && endPosition) {
      fetchLocationName(
        startPosition.lat,
        startPosition.lng,
        setStartLocationName
      ); // Fetch start location name
      fetchLocationName(endPosition.lat, endPosition.lng, setEndLocationName); // Fetch end location name
      setVehiclePosition([startPosition.lat, startPosition.lng]);

      const fetchRoute = async () => {
        const response = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${startPosition.lng},${startPosition.lat};${endPosition.lng},${endPosition.lat}?overview=full&geometries=geojson`
        );

        const routeCoordinates =
          response.data.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
        setPath(routeCoordinates);
      };

      fetchRoute();
    }
   
  }, [startPosition, endPosition]);

  useEffect(() => {

    const fetchLocationName = async (lat, lng, setLocationName) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        setLocationName(response.data.display_name);
      } catch (error) {
        setLocationName("Unknown location");
      }
    };

    if (path.length > 0 && currentStep < path.length) {
      const intervalId = setInterval(() => {

        const currentPosition = path[currentStep];

        setVehiclePosition(path[currentStep]);
        setCurrentStep((prevStep) => prevStep + 1);

         // Fetch and update the location name for the current vehicle position
      fetchLocationName(currentPosition[0], currentPosition[1], setVehicleLocationName);

        
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [path, currentStep]);

  if (!startPosition || !endPosition || !vehiclePosition) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      <div className="flex items-center flex-col">
        <div className="flex flex-col place-content-center items-start border w-auto p-5 bg-gray-00 border-blue-600 shadow-2xl m-5 rounded-lg outline-none">
          <label>
            <span className="font-bold text-green-700">
              Your Start Position:
            </span>{" "}
            {startLocationName}
          </label>
          <label>
            <span className="font-bold text-blue-700">
              Your Current position:
            </span>{" "}
            {vehicleLocationName}

          </label>
          <label>
            <span className="font-bold text-red-700">Your End Position:</span>{" "}
            {endLocationName}
          </label>
        </div>
        <div className=" m-5 w-[80%] flex items-center place-content-center flex-col border-black shadow-2xl ">
          <MapContainer
            className="flex items-center place-content-center"
            center={vehiclePosition}
            zoom={8}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Moving vehicle */}
            <Marker position={vehiclePosition} icon={vehicleIcon}></Marker>{" "}
            {/* Green flag for start */}
            <Marker position={startPosition} icon={startFlagIcon}></Marker>{" "}
            {/* Red flag for end */}
            <Marker position={endPosition} icon={endFlagIcon}></Marker>{" "}
            <Polyline positions={path} color="blue" />
          </MapContainer>
          <div className="text-gray-500">
            <a target="_blank" href="https://icons8.com/icon/65545/green-flag">
              Green and Red flag
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
