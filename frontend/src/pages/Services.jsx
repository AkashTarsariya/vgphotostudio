import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { FadeIn } from '../components/ui/Animations';
import { GridSkeleton } from '../components/ui/Skeleton';
import api from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then(({ data }) => setServices(data.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Services & Packages" description="Explore VG PHOTOSTUDIO photography packages — weddings, pre-weddings, fashion, corporate, maternity, and more." />

      <section className="pt-32 section-padding">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">Packages</span>
            <h1 className="heading-display mb-4">Our Services</h1>
            <p className="text-muted max-w-2xl mx-auto">
              Premium photography packages tailored to your vision. Every package includes our signature artistic approach and meticulous post-production.
            </p>
          </FadeIn>

          {loading ? (
            <GridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <FadeIn key={service._id} delay={i % 2}>
                  <div className={`relative p-8 md:p-10 border transition-all duration-300 hover:shadow-xl ${
                    service.isPopular
                      ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-950/20'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}>
                    {service.isPopular && (
                      <span className="absolute -top-3 left-8 px-4 py-1 bg-brand-500 text-white text-xs tracking-widest uppercase flex items-center gap-1">
                        <Star size={12} className="fill-white" /> Popular
                      </span>
                    )}
                    <h2 className="font-display text-2xl mb-2">{service.name}</h2>
                    <p className="text-muted mb-6 leading-relaxed">{service.shortDescription || service.description}</p>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="font-display text-3xl">₹{service.price?.toLocaleString('en-IN')}</span>
                      <span className="text-muted text-sm">/ {service.duration}</span>
                    </div>

                    {service.deliverables?.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm">
                            <Check size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex gap-3">
                      <Link to={`/services/${service.slug}`} className="btn-outline text-sm py-2.5 px-6">
                        Details
                      </Link>
                      <Link to={`/book?service=${service.slug}`} className="btn-primary text-sm py-2.5 px-6">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
