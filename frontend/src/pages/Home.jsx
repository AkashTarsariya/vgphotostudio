import SEO from "../components/ui/SEO";
// import Hero from '../components/home/Hero';
import Hero from "../components/home/HeroSlider";
import Intro from "../components/home/Intro";
import HeroSlider from "../components/home/HeroSlider";
import FeaturedPortfolio from "../components/home/FeaturedPortfolio";
import ServicesOverview from "../components/home/ServicesOverview";
import Testimonials from "../components/home/Testimonials";
import Awards from "../components/home/Awards";
import CTA from "../components/home/CTA";
import InstagramFeed from "../components/home/InstagramFeed";
import Newsletter from "../components/home/Newsletter";

const Home = () => (
  <>
    <SEO
      title="Premium Photography"
      description="VG PHOTOSTUDIO - Premium photography for weddings, pre-weddings, fashion, portraits, and commercial brands in Mumbai, India."
    />
    <HeroSlider />
    <Intro />
    <FeaturedPortfolio />
    <Awards />
    <ServicesOverview />
    {/* <Testimonials /> */}
    <CTA />
    <InstagramFeed />
    <Newsletter />
  </>
);

export default Home;
