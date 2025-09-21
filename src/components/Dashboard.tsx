import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Camera, MapPin, TrendingUp, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNavigation from './BottomNavigation';
import { DepartmentIcon } from './DepartmentIcon';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import redMarker from '../assets/red_marker.png';
import yellowMarker from '../assets/yellow_marker.png';
import greenMarker from '../assets/green_marker.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [isMapFullscreen, setIsMapFullscreen] = useState(false); // Fullscreen map state
   const [isLoadingNews, setIsLoadingNews] = useState(true); 

  const departments = ['all', 'roads', 'sanitation', 'water', 'lighting'];

  const issues = state?.issues || [];
  const filteredIssues =
    selectedDepartment === 'all'
      ? issues
      : issues.filter((issue) => issue.category === selectedDepartment);

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return redMarker;
      case 'in-progress':
        return yellowMarker;
      case 'resolved':
        return greenMarker;
      default:
        return redMarker;
    }
  };

// Mock News
  const mockNews: { id: number; title: string; description: string; image: string; }[] = [
    { id: 1, title: 'City Council Approves New Park Project', description: 'The council has approved a new park project aiming to increase green spaces for residents.', image: 'https://images.pexels.com/photos/161284/plaza-de-espania-seville-spain-road-traffic-161284.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, title: 'Community Clean-Up Event Scheduled', description: 'Join us for a community clean-up this Saturday at 9 AM. Volunteers are welcome!', image: 'https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, title: 'New Traffic Regulations Implemented', description: 'New traffic regulations are now in effect to improve traffic flow and safety. Please review the changes.', image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, title: 'Public Library Expansion Underway', description: 'Construction has begun on the new wing of the central library, expected to open next year.', image: 'https://images.pexels.com/photos/2041556/pexels-photo-2041556.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, title: 'Annual Water Quality Report Released', description: 'The city has released its annual water quality report, confirming that drinking water is safe.', image: 'https://images.pexels.com/photos/3809545/pexels-photo-3809545.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, title: 'Road Safety Campaign Launched', description: 'A new campaign aims to increase awareness about pedestrian and cyclist safety on city streets.', image: 'https://images.pexels.com/photos/1117562/pexels-photo-1117562.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 7, title: 'Sanitation Department Upgrades Fleet', description: 'New, eco-friendly trucks have been added to the city\'s sanitation fleet.', image: 'https://images.pexels.com/photos/8033230/pexels-photo-8033230.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 8, title: 'Summer Youth Program Registration Open', description: 'Registration for the city\'s summer youth programs is now open for all residents.', image: 'https://images.pexels.com/photos/159775/library-la-trobe-university-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 9, title: 'New Streetlights Installed on Main St', description: 'Energy-efficient LED streetlights have been installed along Main Street to improve visibility.', image: 'https://images.pexels.com/photos/421927/pexels-photo-421927.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 10, title: 'Recycling Program Expansion Announced', description: 'The curbside recycling program will be expanded to include more types of plastics and glass.', image: 'https://images.pexels.com/photos/3951382/pexels-photo-3951382.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 11, title: 'Pothole Repair Blitz Planned for Next Week', description: 'Public works crews will conduct a city-wide pothole repair blitz starting Monday.', image: 'https://images.pexels.com/photos/4552046/pexels-photo-4552046.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 12, title: 'City Museum Offers Free Admission Day', description: 'The city history museum will offer free admission to all visitors this coming Sunday.', image: 'https://images.pexels.com/photos/267828/pexels-photo-267828.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 13, title: 'New Public Transit Routes Added', description: 'Two new bus routes have been added to serve the north and west sides of the city.', image: 'https://images.pexels.com/photos/1579233/pexels-photo-1579233.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 14, title: 'Farmers Market Season Kicks Off', description: 'The downtown farmers market is now open every Saturday from 8 AM to 1 PM.', image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 15, title: 'Fire Department Hosts Open House', description: 'Meet your local firefighters and learn about fire safety at the open house event next weekend.', image: 'https://images.pexels.com/photos/8535496/pexels-photo-8535496.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  // Mock Stats
  const mockStats = {
    totalIssues: issues.length,
    resolvedIssues: issues.filter((i) => i.status === 'resolved').length,
    avgResponseTime: '2d 5h',
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-28 relative">
      {!isMapFullscreen && (
        <>
          {/* Top Bar */}
          <div className="bg-gradient-to-b from-[#1A531A] to-[#7CAE0C] text-white p-4">

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">CC</span>
                </div>
                <div>
                  <p className="text-sm opacity-90">CivicConnect</p>
                  <p className="font-semibold">Citizen Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Ranchi, Jharkhand</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/notifications')}
                  className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={
                      state.user?.avatar ||
                      'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Department Filters */}
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedDepartment === dept
                     ? 'bg-white text-[#1A531A]'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {dept !== 'all' && <DepartmentIcon category={dept as any} size="sm" />}
                  <span className="text-sm capitalize">{dept === 'all' ? 'All Issues' : dept}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="p-4 space-y-6">
        {/* Map Card */}
        {!isMapFullscreen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-50 rounded-xl shadow-sm overflow-hidden relative"
          >
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Issues Near You</h3>
            </div>

            <div
              className="h-64 w-full relative z-0 cursor-pointer"
              onClick={() => setIsMapFullscreen(true)}
            >
              <MapContainer
                center={[23.3441, 85.3096]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredIssues.map((issue, idx) => (
                  <Marker
                    key={issue.id || idx}
                    position={[issue.location.lat, issue.location.lng]}
                    eventHandlers={{
                      click: () => navigate(`/issue/${issue.id}`),
                    }}
                    icon={new L.Icon({
                      iconUrl: getMarkerIcon(issue.status),
                      iconSize: [35, 45],
                      iconAnchor: [17, 45],
                      shadowUrl: markerShadow,
                    })}
                  >
                    <Popup>
                      <b>{issue.title}</b>
                      <br />
                      Status: {issue.status}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <p className="text-sm text-gray-600">
                Showing {filteredIssues.length} issues • Click markers for details
              </p>
            </div>
          </motion.div>
        )}

        {/* Report Issue Card */}
        {!isMapFullscreen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/report')}
            className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center space-x-4">
              {/* A lighter green for the background */}
<div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center">
  {/* The main dark green for the icon */}
  <Camera className="w-8 h-8 text-[#1A531A]" />
</div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800">Report an Issue</h3>
                <p className="text-sm text-gray-600 mt-1">Take a photo and report civic problems</p>
              </div>
            </div>
          </motion.div>
        )}

       {/* Civic News */}
      {!isMapFullscreen && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3" // Adjusted spacing for the section header
        >
          <h3 className="font-bold text-lg text-gray-800 px-1">Civic News</h3> {/* Added px-1 for slight indent */}
          
          {/* This is the horizontal scrolling container */}
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"> {/* Added -mx-4 px-4 for full bleed, scrollbar-hide to match common app UI */}
            {mockNews.map((news) => (
              <div
                key={news.id}
                // Adjusted width, added flex-shrink-0 for scrolling, and increased height for images
                className="flex-shrink-0 w-[280px] bg-white rounded-xl shadow-sm overflow-hidden" 
              >
                {/* Image at the top, slightly taller */}
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-32 object-cover" // h-32 for image height
                />
                {/* Text content below */}
                <div className="p-3"> {/* Slightly less padding to make it compact */}
                  <h4 className="font-semibold text-base text-gray-900 leading-tight">{news.title}</h4> {/* Adjusted font size and line height */}
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{news.description}</p> {/* Smaller text, line-clamp for truncation */}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
        {/* Quick Stats */}
        {!isMapFullscreen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-gray-800">Quick Stats</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              <div className="flex-shrink-0 bg-white rounded-xl shadow-sm p-4 w-40">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{mockStats.totalIssues}</p>
                    <p className="text-sm text-gray-600">Total Issues</p>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 bg-white rounded-xl shadow-sm p-4 w-40">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#1A531A]" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{mockStats.resolvedIssues}</p>
                    <p className="text-sm text-gray-600">Resolved</p>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 bg-white rounded-xl shadow-sm p-4 w-40">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{mockStats.avgResponseTime}</p>
                    <p className="text-sm text-gray-600">Avg Response</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center p-4">
            <button
              onClick={() => setIsMapFullscreen(false)}
              className="text-white p-2 rounded-full hover:bg-white/20 transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-white ml-2 font-semibold">Full Screen Map</span>
          </div>
          <div className="flex-1">
            <MapContainer
              center={[23.3441, 85.3096]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredIssues.map((issue, idx) => (
                <Marker
                  key={issue.id || idx}
                  position={[issue.location.lat, issue.location.lng]}
                  eventHandlers={{
                    click: () => navigate(`/issue/${issue.id}`),
                  }}
                  icon={new L.Icon({
                    iconUrl: getMarkerIcon(issue.status),
                    iconSize: [35, 45],
                    iconAnchor: [17, 45],
                    shadowUrl: markerShadow,
                  })}
                >
                  <Popup>
                    <b>{issue.title}</b>
                    <br />
                    Status: {issue.status}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      {!isMapFullscreen && <BottomNavigation />}
    </div>
  );
};

export default Dashboard;
