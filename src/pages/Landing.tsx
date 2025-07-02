import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Upload, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import heroImage from "@/assets/hero-bg.jpg";

const Landing = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Evaluation",
      description: "AI evaluates descriptive answers in seconds with detailed marking."
    },
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Upload question paper, answer key, and answer sheets in one go."
    },
    {
      icon: Award,
      title: "Transparent & Fair",
      description: "Marks based on correctness and relevance to key."
    }
  ];

  const testimonials = [
    {
      quote: "Amazing tool! Evaluation is fast and clear. Helped me improve.",
      name: "Ritika S.",
      role: "Student"
    },
    {
      quote: "No more manual checking. Saved hours!",
      name: "Mr. Ramesh",
      role: "Teacher"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Welcome to Smart AI Evaluator
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Revolutionizing answer evaluation using Artificial Intelligence.
            </p>
            <Button variant="hero" size="lg" asChild className="animate-glow-pulse">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Smart AI Evaluator?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of educational assessment with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Join the future of smart evaluation today!
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Experience revolutionary AI-powered assessment that saves time and enhances learning
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/login">Login Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Smart AI Evaluator
            </h3>
            <p className="text-muted-foreground mb-6">
              Revolutionizing education through intelligent assessment
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;