import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import CategorySection from "@/components/CategorySection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <FeaturedBooks />
        <CategorySection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
