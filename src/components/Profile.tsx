import React from 'react';
import { motion } from 'framer-motion';
import { 
  Edit, 
  Key, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Profile: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch({ type: 'SET_USER', payload: null as any });
      navigate('/');
    }
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const menuItems = [
    {
      title: 'Account Settings',
      items: [
        {
          icon: Edit,
          label: 'Edit Profile',
          action: () => {},
          description: 'Update your personal information'
        },
        {
          icon: Key,
          label: 'Change Password',
          action: () => {},
          description: 'Update your password'
        }
      ]
    },
    {
      title: 'App Preferences',
      items: [
        {
          icon: state.darkMode ? Sun : Moon,
          label: 'Dark Mode',
          action: toggleDarkMode,
          description: state.darkMode ? 'Switch to light mode' : 'Switch to dark mode',
          rightElement: (
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
              state.darkMode ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                state.darkMode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </div>
          )
        },
        {
          icon: Globe,
          label: 'Language',
          action: () => {},
          description: 'Change app language',
          rightElement: (
            <span className="text-sm text-gray-500">
              {state.language === 'en' ? 'English' : 'हिन्दी'}
            </span>
          )
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          action: () => {},
          description: 'Get notified about issue updates',
          rightElement: (
            <div className="w-12 h-6 rounded-full p-1 bg-green-500">
              <div className="w-4 h-4 rounded-full bg-white translate-x-6" />
            </div>
          )
        }
      ]
    },
    {
      title: 'Help & Support',
      items: [
        {
          icon: Shield,
          label: 'Privacy Policy',
          action: () => {},
          description: 'Read our privacy policy'
        },
        {
          icon: HelpCircle,
          label: 'Help & Support',
          action: () => {},
          description: 'Get help and contact support'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20">
            <img
              src={state.user?.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{state.user?.name || 'User'}</h2>
            <p className="text-white/80 text-sm">{state.user?.phone || '+91 XXXXX XXXXX'}</p>
            <p className="text-white/60 text-sm">{state.user?.address || 'Ranchi, Jharkhand'}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-6">
        {menuItems.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {section.title}
            </h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.rightElement || <ChevronRight className="w-5 h-5 text-gray-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;