import Footer from './components/common/Footer';
import About from './components/homepage/About';
import ActionBanner from './components/homepage/ActionBanner';
import Benefits from './components/homepage/Benefits';
import Block1 from './components/homepage/Block1';
import CallToAction from './components/homepage/CallToAction';
import Features from './components/homepage/Features';
import How from './components/homepage/How';
import SetupAction from './components/homepage/SetupAction';
import Solution from './components/homepage/Solution';
import TextCarousel from './components/TextCarousel';

export default function Home() {
  const texts = [
    'The Smart Way to Grow Your Business - Mcom Bots',
    'Connecting Local Business for Bigger Profits',
    'Transforming your high street into a Network of Opportunities',
  ];

  return (
    <div className="w-full">
      <header>
        <TextCarousel texts={texts} interval={3000} />
        <Block1 />
      </header>
      <About />
      <SetupAction />
      <How />
      <CallToAction />
      <Features />
      <Solution />
      <CallToAction />
      <Benefits />
      <ActionBanner />
      <Footer />
    </div>
  );
}
