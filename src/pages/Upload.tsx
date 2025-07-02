import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

const Upload = () => {
  const fields = [
    { label: "Question Paper (PDF)", type: "file" },
    { label: "Answer Key (PDF)", type: "file" },
    { label: "Student Answer Sheets (PDF or ZIP)", type: "file" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Upload for Evaluation
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload your files and let AI handle the rest
            </p>
          </div>

          <div className="bg-gradient-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <form className="space-y-8">
              {fields.map((field, index) => (
                <div key={index} className="space-y-3">
                  <Label htmlFor={field.label.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}>
                    {field.label}
                  </Label>
                  <Input
                    id={field.label.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}
                    type={field.type}
                    accept=".pdf,.zip"
                    className="h-14 rounded-lg border-border focus:border-primary shadow-soft file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-button file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <p className="text-sm text-muted-foreground">
                    {field.type === "file" && "Supported formats: PDF, ZIP (max 10MB)"}
                  </p>
                </div>
              ))}

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground font-medium mb-2">
                  📝 Note:
                </p>
                <p className="text-sm text-muted-foreground">
                  AI will begin evaluation after upload. You'll receive detailed feedback and marks based on the answer key.
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Upload & Evaluate
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;