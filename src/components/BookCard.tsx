import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Star, IndianRupee } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  rating: number;
  coverImage: string;
  sellerName: string;
}

const BookCard = ({
  id,
  title,
  author,
  price,
  category,
  rating,
  coverImage,
  sellerName,
}: BookCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
          {category}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">by {author}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground ml-2">
            Sold by {sellerName}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-primary font-bold text-xl">
            <IndianRupee className="w-5 h-5" />
            {price}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Link to={`/book/${id}`}>
              <Button size="sm" variant="secondary">
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
