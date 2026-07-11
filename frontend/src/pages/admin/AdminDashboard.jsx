import { useState, useEffect } from 'react';
import { Calendar, Users, FolderOpen, Mail, DollarSign, Clock } from 'lucide-react';
import api from '../../services/api';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
    </div>
    <p className="text-2xl font-display font-medium">{value}</p>
    <p className="text-sm text-muted mt-1">{label}</p>
  </div>
);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics')
      .then(({ data }) => setAnalytics(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-800 w-1/4 rounded" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded" />)}
      </div>
    </div>;
  }

  const overview = analytics?.overview || {};

  return (
    <div>
      <h1 className="font-display text-2xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Calendar} label="Total Bookings" value={overview.totalBookings || 0} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30" />
        <StatCard icon={Clock} label="Pending" value={overview.pendingBookings || 0} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30" />
        <StatCard icon={FolderOpen} label="Projects" value={overview.totalProjects || 0} color="bg-purple-100 text-purple-600 dark:bg-purple-900/30" />
        <StatCard icon={DollarSign} label="Revenue" value={`₹${(overview.totalRevenue || 0).toLocaleString('en-IN')}`} color="bg-green-100 text-green-600 dark:bg-green-900/30" />
        <StatCard icon={Mail} label="Messages" value={overview.totalMessages || 0} color="bg-rose-100 text-rose-600 dark:bg-rose-900/30" />
        <StatCard icon={Users} label="Subscribers" value={overview.totalSubscribers || 0} color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-medium mb-4">Recent Bookings</h2>
          {analytics?.recentBookings?.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentBookings.map((b) => (
                <div key={b._id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 text-sm">
                  <div>
                    <p className="font-medium">{b.name}</p>
                    <p className="text-muted">{b.eventType}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                  }`}>{b.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">No bookings yet</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-medium mb-4">Bookings by Event Type</h2>
          {analytics?.bookingsByEvent?.length > 0 ? (
            <div className="space-y-3">
              {analytics.bookingsByEvent.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-sm">
                  <span>{item._id}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${(item.count / (overview.totalBookings || 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-muted w-6 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">No data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
