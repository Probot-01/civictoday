export const mockIssues = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    description: 'Deep pothole causing damage to vehicles near the market area',
    category: 'roads' as const,
    status: 'submitted' as const,
    date: '2024-01-15',
    image: 'https://images.pexels.com/photos/5691654/pexels-photo-5691654.jpeg?auto=compress&cs=tinysrgb&w=400',
    landmark: 'Near Central Market',
    upvotes: 12,
    userId: '1',
    location: { lat: 23.3441, lng: 85.3096 }
  },
  {
    id: '2',
    title: 'Garbage Not Collected',
    description: 'Garbage bins overflowing for past 3 days in residential area',
    category: 'sanitation' as const,
    status: 'in-progress' as const,
    date: '2024-01-14',
    image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400',
    landmark: 'Sector 5, Block A',
    upvotes: 8,
    userId: '2',
    location: { lat: 23.3456, lng: 85.3125 }
  },
  {
    id: '3',
    title: 'Street Light Not Working',
    description: 'Multiple street lights are out making the area unsafe at night',
    category: 'lighting' as const,
    status: 'resolved' as const,
    date: '2024-01-13',
    image: 'https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=400',
    landmark: 'Park Road Junction',
    upvotes: 15,
    userId: '1',
    location: { lat: 23.3412, lng: 85.3078 }
  },
  {
    id: '4',
    title: 'Water Pipe Leakage',
    description: 'Major water leakage causing road flooding and water wastage',
    category: 'water' as const,
    status: 'in-progress' as const,
    date: '2024-01-12',
    image: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=400',
    landmark: 'Colony Gate',
    upvotes: 20,
    userId: '3',
    location: { lat: 23.3478, lng: 85.3145 }
  },
  {
    id: '5',
    title: 'Road Construction Debris',
    description: 'Construction materials left on road blocking traffic flow',
    category: 'roads' as const,
    status: 'submitted' as const,
    date: '2024-01-11',
    image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=400',
    landmark: 'Highway Circle',
    upvotes: 5,
    userId: '2',
    location: { lat: 23.3434, lng: 85.3089 }
  }
];

export const mockNews = [
  {
    id: '1',
    type: 'city-wide',
    title: 'Trash pickup delayed today due to holiday',
    description: 'Municipal services will resume normal schedule tomorrow',
    date: '2024-01-15',
    icon: '📢'
  },
  {
    id: '2',
    type: 'local',
    title: '50 citizens reported water logging in your area',
    description: 'Emergency drainage team has been dispatched',
    date: '2024-01-15',
    icon: '💧'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Traffic light outage at Central Crossing',
    description: 'Traffic police deployed for manual control',
    date: '2024-01-15',
    icon: '⚠️'
  }
];

export const mockStats = {
  totalIssues: 1247,
  resolvedIssues: 892,
  avgResponseTime: '3.2 days'
};

export const transitionMessages = [
  '🕳️ 50 potholes fixed this week',
  '🚮 Your city is 10kg free of garbage',
  '💡 80% success rate in electricity issues'
];