import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Mail, Trash2, Check } from 'lucide-react';
import api from '../../services/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => api.get('/contact').then(({ data }) => setMessages(data.data));
  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}`, { isRead: true });
    fetchMessages();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete message?')) return;
    await api.delete(`/contact/${id}`);
    toast.success('Deleted');
    fetchMessages();
  };

  return (
    <div>
      <h1 className="font-display text-2xl mb-8">Contact Messages</h1>

      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m._id} className={`bg-white dark:bg-gray-900 border p-5 ${!m.isRead ? 'border-brand-500/50' : 'border-gray-200 dark:border-gray-800'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <Mail size={16} /> {m.name}
                  {!m.isRead && <span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded">New</span>}
                </p>
                <p className="text-sm text-muted">{m.email} · {new Date(m.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                {!m.isRead && (
                  <button onClick={() => markRead(m._id)} className="p-2 text-green-600 hover:bg-green-50 rounded" title="Mark read">
                    <Check size={16} />
                  </button>
                )}
                <button onClick={() => handleDelete(m._id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="font-medium text-sm mb-2">{m.subject}</p>
            <p className="text-muted text-sm">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted text-center py-8">No messages yet</p>}
      </div>
    </div>
  );
};

export default AdminMessages;
