import { Link } from "react-router-dom";
import { 
  Code, 
  Calculator, 
  FlaskConical, 
  BookText, 
  Briefcase, 
  Palette,
  Stethoscope,
  Scale
} from "lucide-react";

const categories = [
  { name: "Engineering", icon: Code, count: 2340, color: "from-blue-500 to-blue-600" },
  { name: "Mathematics", icon: Calculator, count: 1280, color: "from-purple-500 to-purple-600" },
  { name: "Science", icon: FlaskConical, count: 1890, color: "from-green-500 to-green-600" },
  { name: "Literature", icon: BookText, count: 980, color: "from-amber-500 to-amber-600" },
  { name: "Business", icon: Briefcase, count: 1560, color: "from-rose-500 to-rose-600" },
  { name: "Arts", icon: Palette, count: 720, color: "from-pink-500 to-pink-600" },
  { name: "Medical", icon: Stethoscope, count: 1120, color: "from-teal-500 to-teal-600" },
  { name: "Law", icon: Scale, count: 640, color: "from-indigo-500 to-indigo-600" },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find study materials organized by your field of study
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/books?category=${category.name.toLowerCase()}`}
              className="group relative bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                <category.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
