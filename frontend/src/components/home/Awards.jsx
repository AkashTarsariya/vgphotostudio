import { Link } from 'react-router-dom';
import { FadeIn } from '../ui/Animations';
import { Award, Trophy, Medal } from 'lucide-react';

const awards = [
  { icon: Trophy, title: 'Wedding Photographer of the Year', org: 'India Photography Awards 2024' },
  { icon: Award, title: 'Best Editorial Portfolio', org: 'Fashion Lens Awards 2023' },
  { icon: Medal, title: 'Excellence in Commercial Photography', org: 'Creative India Summit 2023' },
  { icon: Trophy, title: 'Top 10 Wedding Photographers', org: 'WedMeGood 2024' },
];

const Awards = () => (
  <section className="section-padding">
    <div className="container-custom">
      <FadeIn className="text-center mb-10">
        <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">Recognition</span>
        <h2 className="heading-section mb-4">Awards & Accolades</h2>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {awards.map((award, i) => (
          <FadeIn key={award.title} delay={i}>
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 hover:border-brand-500/30 transition-colors">
              <award.icon size={32} className="mx-auto mb-4 text-brand-500" />
              <h3 className="font-display text-lg mb-2">{award.title}</h3>
              <p className="text-sm text-muted">{award.org}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default Awards;
