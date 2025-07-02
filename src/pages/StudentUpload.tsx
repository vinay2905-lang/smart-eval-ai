import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

const StudentUpload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Upload Your Answer Sheet
            </h1>
            <p className="text-xl text-muted-foreground">
              Get instant AI-powered evaluation and feedback
            </p>
          </div>

          <div className="bg-gradient-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <form className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="answersheet">Answer Sheet (PDF)</Label>
                <Input
                  id="answersheet"
                  type="file"
                  accept=".pdf"
                  className="h-14 rounded-lg border-border focus:border-primary shadow-soft file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-button file:text-primary-foreground hover:file:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">
                  Upload your completed answer sheet in PDF format (max 5MB)
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="subject">Subject</Label>
                <select 
                  id="subject"
                  className="w-full h-12 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring shadow-soft"
                >
                  <option value="">Select Subject</option>
                  <option value="science">Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="social">Social Studies</option>
                </select>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground font-medium mb-2">
                  🚀 What happens next?
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI analyzes your answers instantly</li>
                  <li>• Detailed feedback on each response</li>
                  <li>• Marks based on accuracy and relevance</li>
                  <li>• Results available in your dashboard</li>
                </ul>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Upload & Get Evaluated
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentUpload;