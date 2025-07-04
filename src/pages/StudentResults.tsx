import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const StudentResults = () => {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStudentEvaluations();
  }, []);

  const fetchStudentEvaluations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to view your results.",
          variant: "destructive",
        });
        return;
      }

      // Fetch evaluations for current student
      const { data: evaluationsData, error } = await supabase
        .from('evaluations')
        .select(`
          *,
          submissions!inner(
            assignment_id,
            content,
            assignments(title, description)
          )
        `)
        .eq('submissions.student_id', user.id)
        .order('evaluated_at', { ascending: false });

      if (error) throw error;

      setEvaluations(evaluationsData || []);
    } catch (error: any) {
      console.error('Error fetching evaluations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your evaluation results.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Evaluation Summary
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your academic progress and feedback
          </p>
        </div>

        {evaluations.length === 0 ? (
          <div className="bg-gradient-card rounded-2xl shadow-card p-12 text-center">
            <p className="text-muted-foreground mb-4">No evaluations found.</p>
            <Button variant="default" asChild>
              <a href="/student-upload">Submit Your First Evaluation</a>
            </Button>
          </div>
        ) : (
          <div className="bg-gradient-card rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-hero/10">
                  <TableHead className="font-semibold text-foreground">Assignment</TableHead>
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Score</TableHead>
                  <TableHead className="font-semibold text-foreground">Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map((evaluation) => (
                  <TableRow key={evaluation.id} className="hover:bg-secondary/20 transition-colors">
                    <TableCell className="font-medium text-foreground">
                      {evaluation.submissions?.assignments?.title || 'Assignment'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(evaluation.evaluated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{evaluation.score}/100</span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Feedback",
                            description: evaluation.feedback,
                          });
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to improve your scores? Upload a new answer sheet for evaluation.
          </p>
          <Button variant="default" asChild>
            <a href="/student-upload">Start New Evaluation</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;