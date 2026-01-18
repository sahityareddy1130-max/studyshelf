import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { searchSchema } from "@/lib/validation";

const allBooks = [
  {
    id: "1",
    title: "Data Structures and Algorithms Made Easy",
    author: "Narasimha Karumanchi",
    price: 99,
    category: "Engineering",
    rating: 4.8,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    sellerName: "Rahul K.",
  },
  {
    id: "2",
    title: "Organic Chemistry Notes - Complete Semester",
    author: "Dr. Sharma",
    price: 49,
    category: "Science",
    rating: 4.5,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    sellerName: "Priya M.",
  },
  {
    id: "3",
    title: "UPSC Prelims Complete Guide 2024",
    author: "Various",
    price: 149,
    category: "Competitive",
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
    sellerName: "Amit S.",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    author: "Andrew Ng Notes",
    price: 79,
    category: "Engineering",
    rating: 4.7,
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    sellerName: "Sneha R.",
  },
  {
    id: "5",
    title: "Economics for CUET - Complete Notes",
    author: "Prof. Gupta",
    price: 59,
    category: "Business",
    rating: 4.6,
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop",
    sellerName: "Vikram T.",
  },
  {
    id: "6",
    title: "Anatomy & Physiology Handbook",
    author: "Dr. Reddy",
    price: 129,
    category: "Medical",
    rating: 4.8,
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    sellerName: "Kavya N.",
  },
  {
    id: "7",
    title: "Constitutional Law Notes - LLB",
    author: "Adv. Singh",
    price: 89,
    category: "Law",
    rating: 4.4,
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
    sellerName: "Arjun P.",
  },
  {
    id: "8",
    title: "JEE Advanced Physics Solutions",
    author: "IIT Faculty",
    price: 119,
    category: "Engineering",
    rating: 4.9,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    sellerName: "Deepak R.",
  },
];

const categories = ["All", "Engineering", "Science", "Medical", "Law", "Business", "Competitive"];

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  // Sanitize search query using zod schema
  const sanitizedQuery = useMemo(() => {
    const result = searchSchema.safeParse({ query: searchQuery });
    return result.success ? result.data.query : "";
  }, [searchQuery]);

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const query = sanitizedQuery.toLowerCase();
      const matchesSearch = book.title.toLowerCase().includes(query) ||
                           book.author.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [sanitizedQuery, selectedCategory, priceRange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limit input length
    if (value.length <= 200) {
      setSearchQuery(value);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Browse Study Materials
            </h1>
            <p className="text-muted-foreground">
              Find the perfect resources for your studies
            </p>
          </div>
          
          {/* Search & Filters */}
          <div className="bg-card rounded-xl p-4 shadow-soft mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, author, or keyword..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10"
                  maxLength={200}
                />
              </div>
              <Button variant="outline" className="md:w-auto">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  {selectedCategory === category && category !== "All" && (
                    <X className="w-3 h-3 ml-1" onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory("All");
                    }} />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredBooks.length} results
            </p>
          </div>
          
          {/* Book Grid */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No books found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
