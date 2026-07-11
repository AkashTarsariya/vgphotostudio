import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchData = () => api.get('/testimonials').then(({ data }) => setTestimonials(data.data));
  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/testimonials', { ...data, rating: Number(data.rating), isFeatured: data.isFeatured === 'true' });
      toast.success('Testimonial added');
      reset();
      setShowForm(false);
      fetchData();
    } catch {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/testimonials/${id}`);
    toast.success('Deleted');
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-2xl">Testimonials</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
          <Plus size={16} /> Add
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 border p-6 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Client Name" {...register('clientName', { required: true })} />
            <input className="input-field" placeholder="Role / Event Type" {...register('clientRole')} />
            <input type="number" min="1" max="5" className="input-field" placeholder="Rating (1-5)" {...register('rating', { required: true })} />
            <select className="input-field" {...register('isFeatured')}><option value="false">Normal</option><option value="true">Featured</option></select>
          </div>
          <textarea className="input-field" rows={3} placeholder="Testimonial content" {...register('content', { required: true })} />
          <button type="submit" className="btn-primary text-sm">Save</button>
        </form>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t._id} className="flex justify-between items-start bg-white dark:bg-gray-900 border p-4">
            <div>
              <p className="font-medium">{t.clientName} {t.isFeatured && <span className="text-xs text-brand-500 ml-2">Featured</span>}</p>
              <p className="text-sm text-muted italic mt-1">"{t.content}"</p>
            </div>
            <button onClick={() => handleDelete(t._id)} className="p-2 text-red-600"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
