import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you
            </p>
          </div>

          <div className="bg-gradient-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-12 rounded-lg border-border focus:border-primary shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 rounded-lg border-border focus:border-primary shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  className="min-h-[120px] rounded-lg border-border focus:border-primary shadow-soft resize-none"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
              </Button>
            </form>

            <div className="mt-8 p-6 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-foreground font-medium mb-2">
                📧 Quick Response Promise
              </p>
              <p className="text-sm text-muted-foreground">
                We'll get back to you within 24 hours! Our team is here to help you succeed.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Other Ways to Reach Us</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-card p-6 rounded-xl shadow-soft">
                <h4 className="font-semibold text-foreground mb-2">Support Email</h4>
                <p className="text-muted-foreground">support@smartevaluator.com</p>
              </div>
              <div className="bg-gradient-card p-6 rounded-xl shadow-soft">
                <h4 className="font-semibold text-foreground mb-2">Business Hours</h4>
                <p className="text-muted-foreground">Mon-Fri, 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;