import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Upload, Search, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
      
      {/* Floating Books Decoration */}
      <div className="absolute top-20 right-10 w-32 h-40 bg-card/10 rounded-lg rotate-12 animate-float hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-24 h-32 bg-card/10 rounded-lg -rotate-12 animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-up">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm text-primary-foreground/90">
              India's Student Book Marketplace
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Books & Notes at{" "}
            <span className="text-secondary">Affordable</span>{" "}
            Prices
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Buy and sell study materials, PDFs, notes, and books with fellow students. 
            Skip the expensive bookstores and connect directly with peers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/books">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Browse Books
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                <Upload className="w-5 h-5 mr-2" />
                Sell Your Materials
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">10,000+</div>
              <div className="text-sm text-primary-foreground/70">Study Materials</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">5,000+</div>
              <div className="text-sm text-primary-foreground/70">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-foreground">₹50</div>
              <div className="text-sm text-primary-foreground/70">Average Price</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
