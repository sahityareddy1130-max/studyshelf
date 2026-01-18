import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Star, 
  IndianRupee, 
  MessageCircle, 
  Download, 
  Shield, 
  Clock,
  User,
  FileText,
  Calendar
} from "lucide-react";

// Mock book data
const bookData: Record<string, {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  coverImage: string;
  sellerName: string;
  sellerEmail: string;
  description: string;
  pages: number;
  uploadDate: string;
  format: string;
}> = {
  "1": {
    id: "1",
    title: "Data Structures and Algorithms Made Easy",
    author: "Narasimha Karumanchi",
    price: 99,
    category: "Engineering",
    rating: 4.8,
    reviews: 234,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop",
    sellerName: "Rahul Kumar",
    sellerEmail: "rahul.k@email.com",
    description: "Complete notes covering all important data structures including Arrays, Linked Lists, Trees, Graphs, and advanced algorithms. Perfect for placement preparation and competitive programming. Includes solved examples and practice problems from top companies.",
    pages: 320,
    uploadDate: "2024-01-15",
    format: "PDF",
  },
};

const BookDetail = () => {
  const { id } = useParams();
  const book = bookData[id || "1"] || bookData["1"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/books" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-card">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Book Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Badge className="mb-3">{book.category}</Badge>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-muted-foreground">by {book.author}</p>
              </div>
              
              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? "fill-secondary text-secondary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{book.rating}</span>
                <span className="text-muted-foreground">({book.reviews} reviews)</span>
              </div>
              
              {/* Price & Actions */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-primary text-4xl font-bold">
                      <IndianRupee className="w-8 h-8" />
                      {book.price}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      Secure Payment
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" size="lg" className="flex-1">
                      <Download className="w-5 h-5 mr-2" />
                      Buy Now
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact Seller
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Description */}
              <div>
                <h2 className="font-serif text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="shadow-soft">
                  <CardContent className="p-4 text-center">
                    <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p className="font-semibold">{book.pages}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="p-4 text-center">
                    <Download className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-semibold">{book.format}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Uploaded</p>
                    <p className="font-semibold">{book.uploadDate}</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Delivery</p>
                    <p className="font-semibold">Instant</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Seller Info */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-4">Seller Information</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{book.sellerName}</p>
                      <p className="text-sm text-muted-foreground">{book.sellerEmail}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
