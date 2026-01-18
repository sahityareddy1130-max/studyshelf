import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookCard from "./BookCard";
import { ArrowRight } from "lucide-react";

const featuredBooks = [
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
];

const FeaturedBooks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Books
            </h2>
            <p className="text-muted-foreground">
              Top-rated materials from our community
            </p>
          </div>
          <Link to="/books">
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
