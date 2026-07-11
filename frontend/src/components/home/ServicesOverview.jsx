import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/Animations';
import { Camera, Heart, Sparkles, Building2, Baby, Shirt } from 'lucide-react';
import api from '../../services/api';

const iconMap = {
  'wedding-photography': Heart,
  'pre-wedding': Sparkles,
  birthday: Camera,
  engagement: Heart,
  // fashion: Shirt,
  maternity: Baby,
  corporate: Building2,
  'product-photography': Camera,
};

const ServicesOverview = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services?limit=6')
      .then(({ data }) => setServices(data.data.slice(0, 6)))
      .catch(() => setServices([]));
  }, []);

  const fallbackServices = [
    { name: 'Wedding Photography', slug: 'wedding-photography', shortDescription: 'Full-day cinematic wedding coverage', price: 85000 },
    { name: 'Pre-Wedding', slug: 'pre-wedding', shortDescription: 'Romantic couple shoots at dream locations', price: 35000 },
    // { name: 'Fashion', slug: 'fashion', shortDescription: 'Editorial fashion photography', price: 45000 },
    { name: 'Maternity', slug: 'maternity', shortDescription: 'Elegant motherhood portraits', price: 20000 },
    { name: 'Corporate', slug: 'corporate', shortDescription: 'Professional team photography', price: 30000 },
    { name: 'Birthday', slug: 'birthday', shortDescription: 'Creative celebration photography', price: 15000 },
  ];

  const displayServices = services.length ? services : fallbackServices;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">What We Offer</span>
          <h2 className="heading-section mb-4">Photography Services</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Tailored packages designed to capture your unique story with artistry and precision.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, i) => {
            const Icon = iconMap[service.slug] || Camera;
            return (
              <FadeIn key={service.slug || service._id} delay={i}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group block p-8 border border-gray-200 dark:border-gray-800 hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg"
                >
                  <Icon size={28} className="text-brand-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-xl mb-2">{service.name}</h3>
                  <p className="text-muted text-sm mb-4 leading-relaxed">
                    {service.shortDescription || service.description?.slice(0, 100)}
                  </p>
                  <p className="text-brand-600 dark:text-brand-400 font-medium">
                    From ₹{service.price?.toLocaleString('en-IN')}
                  </p>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="text-center mt-12">
          <Link to="/services" className="btn-primary">Explore All Packages</Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServicesOverview;
