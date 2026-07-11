import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { PageTransition } from '../ui/Animations';

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <PageTransition>
        <Outlet />
      </PageTransition>
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
