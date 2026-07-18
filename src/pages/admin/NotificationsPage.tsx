import React, { useState } from 'react';

// 1. Define the Interface
export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'Booking' | 'Payment' | 'Flight' | 'Customer';
  isRead: boolean;
}

// 2. Mock Data (Extended with isRead status)
const initialNotifications: AdminNotification[] = [
  { 
    id: '1', 
    title: 'New booking received', 
    message: '3 VIP bookings were checked in during the last hour.', 
    time: '8 min ago', 
    category: 'Booking',
    isRead: false
  },
  { 
    id: '2', 
    title: 'Payment received', 
    message: 'A wire transfer of $12,400 was confirmed.', 
    time: '26 min ago', 
    category: 'Payment',
    isRead: false
  },
  { 
    id: '3', 
    title: 'Flight update', 
    message: 'Flight EK401 is delayed by 30 minutes.', 
    time: '1 hr ago', 
    category: 'Flight',
    isRead: true
  },
  { 
    id: '4', 
    title: 'Customer registration', 
    message: 'A new premium member completed signup.', 
    time: '2 hrs ago', 
    category: 'Customer',
    isRead: true
  },
];

// 3. Helper for Category Badges (Styles)
const categoryStyles: Record<AdminNotification['category'], string> = {
  Booking: 'bg-blue-50 text-blue-700 border-blue-200',
  Payment: 'bg-green-50 text-green-700 border-green-200',
  Flight: 'bg-amber-50 text-amber-700 border-amber-200',
  Customer: 'bg-purple-50 text-purple-700 border-purple-200',
};

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Derived State
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const filteredNotifications = notifications.filter(n => 
    activeFilter === 'All' || n.category === activeFilter
  );

  // Actions
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    ));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the read toggle
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">Manage your system updates and activity logs.</p>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors self-start sm:self-center"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Booking', 'Payment', 'Flight', 'Customer'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeFilter === filter
                  ? 'bg-gray-950 text-white border-gray-950 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notifications List Wrapper */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-base font-medium">No notifications found</p>
              <p className="text-sm text-gray-400 mt-1">There's nothing to show in this category right now.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => toggleReadStatus(notification.id)}
                  className={`p-5 flex gap-4 transition-colors cursor-pointer relative group ${
                    notification.isRead ? 'bg-white hover:bg-gray-50' : 'bg-indigo-50/30 hover:bg-indigo-50/50'
                  }`}
                >
                  {/* Unread dot indicator */}
                  {!notification.isRead && (
                    <span className="absolute left-2 top-[26px] h-2.5 w-2.5 rounded-full bg-indigo-600" />
                  )}

                  {/* Main Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${categoryStyles[notification.category]}`}>
                          {notification.category}
                        </span>
                        <h3 className={`text-sm font-semibold ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap pt-0.5">{notification.time}</span>
                    </div>
                    <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-600 font-medium'}`}>
                      {notification.message}
                    </p>
                  </div>

                  {/* Dismiss/Delete Button */}
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteNotification(notification.id, e)}
                      className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete notification"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};