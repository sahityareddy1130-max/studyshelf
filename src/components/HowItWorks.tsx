import { Upload, Search, MessageCircle, Download } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Your Book",
    description: "Browse through thousands of study materials uploaded by fellow students",
  },
  {
    icon: MessageCircle,
    title: "Contact Seller",
    description: "Have questions? Reach out directly to the person who uploaded the material",
  },
  {
    icon: Download,
    title: "Purchase & Download",
    description: "Pay securely and get instant access to your study materials",
  },
  {
    icon: Upload,
    title: "Sell Your Own",
    description: "Made great notes? Upload and earn by helping other students",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Simple steps to buy or sell study materials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary-foreground/20" />
              )}
              
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 backdrop-blur-sm mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-primary-foreground/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
