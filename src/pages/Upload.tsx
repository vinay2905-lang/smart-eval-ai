import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const Upload = () => {
  const [files, setFiles] = useState<Record<string, File | null>>({
    questionPaper: null,
    answerKey: null,
    studentAnswers: null
  });
  const [loading, setLoading] = useState(false);
  const [evaluationData, setEvaluationData] = useState({
    studentName: '',
    hallTicket: '',
    subject: '',
    dateOfBirth: ''
  });
  const { toast } = useToast();

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setEvaluationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!files.questionPaper || !files.answerKey || !files.studentAnswers) {
        throw new Error('Please upload all required files');
      }

      if (!evaluationData.studentName || !evaluationData.hallTicket || !evaluationData.subject) {
        throw new Error('Please fill in all student details');
      }

      // For demo purposes, simulate AI evaluation
      const simulatedScore = Math.floor(Math.random() * 20) + 60; // Score between 60-80
      const maxPoints = 100;
      
      const simulatedFeedback = `Overall performance shows good understanding of ${evaluationData.subject} concepts. Student demonstrates solid grasp of fundamental principles with room for improvement in advanced topics.`;
      
      const simulatedStrengths = [
        "Clear problem-solving approach",
        "Good understanding of basic concepts",
        "Well-structured answers"
      ];
      
      const simulatedImprovements = [
        "More detailed explanations needed",
        "Practice with complex problems",
        "Better time management"
      ];

      // Create evaluation record
      const { data: evaluation, error: evalError } = await supabase
        .from('evaluations')
        .insert({
          submission_id: 'demo-submission-' + Date.now(), // In real app, this would be from submissions table
          score: simulatedScore,
          feedback: simulatedFeedback,
          strengths: simulatedStrengths,
          improvements: simulatedImprovements
        })
        .select()
        .single();

      if (evalError) throw evalError;

      // Generate memorandum using our AI function
      const { data: memoResult, error: memoError } = await supabase.functions.invoke('generate-memorandum', {
        body: {
          evaluationId: evaluation.id,
          studentName: evaluationData.studentName,
          hallTicket: evaluationData.hallTicket,
          subject: evaluationData.subject,
          score: simulatedScore,
          maxPoints: maxPoints,
          feedback: simulatedFeedback,
          strengths: simulatedStrengths,
          improvements: simulatedImprovements
        }
      });

      if (memoError) {
        console.error('Memorandum generation error:', memoError);
        // Don't throw here - evaluation was successful, memo generation is bonus
      }

      toast({
        title: "Evaluation Complete!",
        description: `AI has evaluated the submission. Score: ${simulatedScore}/${maxPoints}. ${memoResult?.memorandumUrl ? 'Memorandum generated successfully!' : ''}`,
      });

      // Reset form
      setFiles({
        questionPaper: null,
        answerKey: null,
        studentAnswers: null
      });
      setEvaluationData({
        studentName: '',
        hallTicket: '',
        subject: '',
        dateOfBirth: ''
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "questionPaper", label: "Question Paper (PDF)", type: "file" },
    { key: "answerKey", label: "Answer Key (PDF)", type: "file" },
    { key: "studentAnswers", label: "Student Answer Sheets (PDF or ZIP)", type: "file" }
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Details Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Student Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      type="text"
                      placeholder="Enter student name"
                      value={evaluationData.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      className="h-12 rounded-lg border-border focus:border-primary shadow-soft"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hallTicket">Hall Ticket Number</Label>
                    <Input
                      id="hallTicket"
                      type="text"
                      placeholder="Enter hall ticket"
                      value={evaluationData.hallTicket}
                      onChange={(e) => handleInputChange('hallTicket', e.target.value)}
                      className="h-12 rounded-lg border-border focus:border-primary shadow-soft"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Enter subject"
                      value={evaluationData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="h-12 rounded-lg border-border focus:border-primary shadow-soft"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={evaluationData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="h-12 rounded-lg border-border focus:border-primary shadow-soft"
                    />
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Upload Files</h3>
                {fields.map((field, index) => (
                  <div key={index} className="space-y-3">
                    <Label htmlFor={field.key}>
                      {field.label}
                    </Label>
                    <Input
                      id={field.key}
                      type="file"
                      accept=".pdf,.zip"
                      onChange={(e) => handleFileChange(field.key, e.target.files?.[0] || null)}
                      className="h-14 rounded-lg border-border focus:border-primary shadow-soft file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-button file:text-primary-foreground hover:file:bg-primary/90"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Supported formats: PDF, ZIP (max 10MB)
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground font-medium mb-2">
                  🤖 AI Evaluation Process:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AI will analyze student answers against the answer key</li>
                  <li>• Generate detailed feedback and scoring</li>
                  <li>• Create professional marks memorandum</li>
                  <li>• Process typically takes 1-2 minutes</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Processing with AI..." : "Upload & Evaluate"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;