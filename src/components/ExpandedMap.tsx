import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DepartmentIcon } from './DepartmentIcon';

const ExpandedMap: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const departments = ['all', 'roads', 'sanitation', 'water', 'lighting'];
  const statuses = ['all', 'submitted', 'in-progress', 'resolved'];

  const filteredIssues = state.issues
    .filter(issue => selectedDepartment === 'all' || issue.category === selectedDepartment)
    .filter(issue => selectedStatus === 'all' || issue.status === selectedStatus);

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return 'Submitted';
      case 'in-progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 relative z-20">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Issues Map</h1>
        </div>

        {/* Department Filters */}
        <div className="flex space-x-2 mb-3 overflow-x-auto pb-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedDepartment === dept
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dept !== 'all' && <DepartmentIcon category={dept as any} size="sm" />}
              <span className="text-sm capitalize">
                {dept === 'all' ? 'All Departments' : dept}
              </span>
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All Status' : getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[calc(100vh-200px)] bg-green-50">
        {/* Mock Map with Issues */}
        <div className="absolute inset-0">
          {filteredIssues.map((issue, index) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className={`absolute w-4 h-4 rounded-full cursor-pointer transform hover:scale-150 transition-all duration-200 shadow-lg ${getMarkerColor(issue.status)}`}
              style={{
                top: `${15 + (index * 8) % 70}%`,
                left: `${10 + (index * 12) % 80}%`
              }}
            />
          ))}
        </div>

        {/* GPS Location Button */}
        <button className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <MapPin className="w-6 h-6 text-green-600" />
        </button>

        {/* Stats */}
        <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Showing Issues</p>
          <p className="text-2xl font-bold text-gray-800">{filteredIssues.length}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Submitted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Resolved</span>
          </div>
        </div>
      </div>

      {/* Issue Popup/Modal */}
      {selectedIssue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-x-0 bottom-0 bg-white rounded-t-xl shadow-2xl z-30 max-h-[50vh] overflow-y-auto"
        >
          <div className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <DepartmentIcon category={selectedIssue.category} size="md" />
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedIssue.title}</h3>
                  <p className="text-sm text-gray-600 capitalize">{selectedIssue.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {selectedIssue.image && (
              <img
                src={selectedIssue.image}
                alt={selectedIssue.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getMarkerColor(selectedIssue.status)}`}>
                  {getStatusText(selectedIssue.status)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Date</span>
                <span className="text-sm text-gray-800">{selectedIssue.date}</span>
              </div>

              {selectedIssue.landmark && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Landmark</span>
                  <span className="text-sm text-gray-800">{selectedIssue.landmark}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Upvotes</span>
                <span className="text-sm text-gray-800">{selectedIssue.upvotes}</span>
              </div>

              <button
                onClick={() => navigate(`/issue/${selectedIssue.id}`)}
                className="w-full mt-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExpandedMap;