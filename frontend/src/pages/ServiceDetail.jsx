import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Plus, ArrowLeft } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { FadeIn } from '../components/ui/Animations';
import FAQ from '../components/ui/FAQ';
import api from '../services/api';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/services/slug/${slug}`)
      .then(({ data }) => setService(data.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 section-padding container-custom">
        <div className="skeleton h-8 w-1/3 mb-4" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-32 section-padding text-center">
        <h1 className="heading-section mb-4">Service Not Found</h1>
        <Link to="/services" className="btn-outline">View All Services</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={service.name} description={service.description?.slice(0, 160)} />

      <section className="pt-32 section-padding">
        <div className="container-custom max-w-4xl">
          <Link to="/services" className="inline-flex items-center gap-2 text-muted hover:text-brand-500 mb-8 text-sm">
            <ArrowLeft size={16} /> All Services
          </Link>

          <FadeIn>
            <h1 className="heading-display mb-4">{service.name}</h1>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-4xl text-brand-600 dark:text-brand-400">
                ₹{service.price?.toLocaleString('en-IN')}
              </span>
              <span className="text-muted">{service.duration}</span>
            </div>
            <p className="text-muted text-lg leading-relaxed mb-12">{service.description}</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <FadeIn delay={1}>
              <h2 className="font-display text-2xl mb-6">Deliverables</h2>
              <ul className="space-y-3">
                {service.deliverables?.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <Check size={18} className="text-brand-500 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {service.addOns?.length > 0 && (
              <FadeIn delay={2}>
                <h2 className="font-display text-2xl mb-6">Add-ons</h2>
                <ul className="space-y-4">
                  {service.addOns.map((addon) => (
                    <li key={addon.name} className="flex items-start gap-3 p-4 border border-gray-200 dark:border-gray-800">
                      <Plus size={18} className="text-brand-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{addon.name}</p>
                        <p className="text-sm text-muted">{addon.description}</p>
                        <p className="text-brand-600 dark:text-brand-400 text-sm mt-1">
                          +₹{addon.price?.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}
          </div>

          {service.faqs?.length > 0 && (
            <FadeIn className="mb-16">
              <h2 className="font-display text-2xl mb-6">FAQs</h2>
              <FAQ items={service.faqs} />
            </FadeIn>
          )}

          <FadeIn className="text-center p-12 bg-gray-50 dark:bg-gray-900">
            <h2 className="font-display text-2xl mb-4">Ready to Book?</h2>
            <p className="text-muted mb-6">Secure your date and let's start planning your perfect session.</p>
            <Link to={`/book?service=${service.slug}`} className="btn-primary">
              Book {service.name}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
