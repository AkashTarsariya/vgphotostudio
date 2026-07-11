import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { FadeIn } from '../components/ui/Animations';
import api from '../services/api';

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      api.get(`/bookings/code/${code}`)
        .then(({ data }) => setBooking(data.data))
        .catch(() => {});
    }
  }, [code]);

  return (
    <>
      <SEO title="Booking Confirmed" />

      <section className="pt-32 section-padding min-h-[60vh] flex items-center">
        <div className="container-custom max-w-lg text-center mx-auto">
          <FadeIn>
            <CheckCircle size={64} className="mx-auto mb-6 text-green-500" />
            <h1 className="heading-section mb-4">Payment Successful!</h1>
            <p className="text-muted mb-6">Thank you for choosing VG PHOTOSTUDIO. Your session is being confirmed.</p>

            {booking && (
              <div className="p-6 border border-gray-200 dark:border-gray-800 mb-8 text-left space-y-2 text-sm">
                <p><strong>Code:</strong> {booking.confirmationCode}</p>
                <p><strong>Event:</strong> {booking.eventType}</p>
                <p><strong>Date:</strong> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio" className="btn-outline">View Portfolio</Link>
              <Link to="/" className="btn-primary">Back to Home</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default BookingSuccess;
