import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';

const NotFound = () => (
  <>
    <SEO title="Page Not Found" />
    <section className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center">
        <h1 className="font-display text-8xl text-brand-500 mb-4">404</h1>
        <h2 className="heading-section mb-4">Page Not Found</h2>
        <p className="text-muted mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </section>
  </>
);

export default NotFound;
