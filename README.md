# Map Navigator

Map Navigator is a React-based application that visualizes a route between two locations with real-time vehicle movement. The project uses Leaflet for map rendering, Axios for geocoding, and Tailwind CSS for styling.

## Features

- **Real-Time Navigation**: Displays the movement of a vehicle along the calculated route between the start and end positions.
- **Dynamic Input**: Users can input start and end locations, which are converted into coordinates and used to generate the route.
- **Interactive Map**: The map displays start and end markers, the vehicle's current position, and a polyline representing the route.
- **Geocoding**: Converts location names into geographic coordinates using the Nominatim API via Axios.
- **Responsive UI**: The user interface is styled using Tailwind CSS for a modern and responsive design.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. **Clone the repository:** `git clone https://github.com/your-username/map-navigator.git`
2. **Navigate to the project directory:** `cd map-navigator`
3. **Install the dependencies:** `npm install`
4. **Start the development server:** `npm start`
5. **Open your browser and visit:** `http://localhost:3000`

## Project Structure

- `App.jsx`: Main component that handles routing and state management.
- `MapComponent.jsx`: Renders the map, markers, and polyline, and handles vehicle movement.
- `InputLocations.jsx`: Form component for user input of start and end locations.
- `jeoUtils.js`: Utility file containing the geocoding function to fetch coordinates from location names.
- `Navbar.jsx` and `Header.jsx`: UI components for navigation and header sections.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: For handling routing between pages.
- **Leaflet**: Open-source library for interactive maps.
- **Axios**: Promise-based HTTP client for making API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Nominatim API**: Geocoding service used to convert location names to coordinates.


