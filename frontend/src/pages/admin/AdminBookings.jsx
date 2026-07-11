import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Check, X, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchBookings = () => {
    const params = filter ? `?status=${filter}` : '';
    api.get(`/bookings${params}`)
      .then(({ data }) => setBookings(data.data))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch {
      toast.error('Update failed');
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      toast.success('Deleted');
      fetchBookings();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-display text-2xl">Bookings</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-auto">
          <option value="">All Status</option>
          {['pending', 'confirmed', 'rejected', 'completed', 'cancelled'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800 rounded" />)}</div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Code', 'Name', 'Event', 'Date', 'Status', 'Payment', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 font-mono text-xs">{b.confirmationCode}</td>
                  <td className="px-4 py-3">
                    <p>{b.name}</p>
                    <p className="text-muted text-xs">{b.email}</p>
                  </td>
                  <td className="px-4 py-3">{b.eventType}</td>
                  <td className="px-4 py-3">{new Date(b.preferredDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3">{b.paymentStatus}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {b.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(b._id, 'confirmed')} className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Confirm"><Check size={16} /></button>
                          <button onClick={() => updateStatus(b._id, 'rejected')} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Reject"><X size={16} /></button>
                        </>
                      )}
                      <button onClick={() => deleteBooking(b._id)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && <p className="text-center text-muted py-8">No bookings found</p>}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
