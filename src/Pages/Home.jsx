import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import NewsletterGrid from "../Components/NewsletterGrid";
import Hero from "../Components/HomeHero/Hero";
import LearnMoreSection from "../Components/LearnMoreSection";
import AlternativeSection from "../Components/AlternativeSection";
import ContactSection from "../Components/ContactSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AlternativeSection />
      <LearnMoreSection />
      <NewsletterGrid />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
