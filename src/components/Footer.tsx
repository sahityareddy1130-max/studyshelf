import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold">StudyShelf</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-md mb-4">
              India's trusted marketplace for students to buy and sell study materials, 
              notes, and PDFs at affordable prices.
            </p>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@studyshelf.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/books" className="hover:text-primary-foreground transition-colors">Browse Books</Link></li>
              <li><Link to="/upload" className="hover:text-primary-foreground transition-colors">Sell Materials</Link></li>
              <li><Link to="/auth" className="hover:text-primary-foreground transition-colors">Login / Sign Up</Link></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Engineering</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Medical</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">UPSC & Govt Exams</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">MBA & Business</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© 2024 StudyShelf. All rights reserved. Made with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
