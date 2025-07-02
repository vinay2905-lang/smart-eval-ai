import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              About Smart Evaluator
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Revolutionizing education through intelligent assessment technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Smart Evaluator is an AI-powered platform designed to transform how descriptive exam answers are evaluated. 
                We combine cutting-edge artificial intelligence with educational expertise to provide accurate, fair, and 
                instant feedback to both students and educators.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Built for both students and teachers, our platform ensures transparency in grading while significantly 
                reducing the time and effort required for manual evaluation.
              </p>
            </div>
            <div className="bg-gradient-card p-8 rounded-2xl shadow-card">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">AI-powered evaluation in seconds</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Detailed feedback and scoring</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Support for multiple file formats</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Comprehensive reporting system</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-card p-8 rounded-2xl shadow-card text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and educators who are already experiencing the future of assessment
            </p>
            <div className="space-x-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">Sign Up Today</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;