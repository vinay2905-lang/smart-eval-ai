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

const AdminResults = () => {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllEvaluations();
  }, []);

  const fetchAllEvaluations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to view evaluations.",
          variant: "destructive",
        });
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        toast({
          title: "Access denied",
          description: "Only admins can view all evaluations.",
          variant: "destructive",
        });
        return;
      }

      // Fetch all evaluations with student details
      const { data: evaluationsData, error } = await supabase
        .from('evaluations')
        .select(`
          *,
          submissions!inner(
            student_id,
            assignment_id,
            assignments(title, description),
            profiles!submissions_student_id_fkey(full_name)
          )
        `)
        .order('evaluated_at', { ascending: false });

      if (error) throw error;

      setEvaluations(evaluationsData || []);
    } catch (error: any) {
      console.error('Error fetching evaluations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch evaluation results.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadMemorandum = async (evaluation: any) => {
    if (!evaluation.memorandum_file_url) {
      toast({
        title: "No memorandum",
        description: "Memorandum not yet generated for this evaluation.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the download URL from Supabase storage
      const { data } = supabase.storage.from('marks-memorandums').getPublicUrl(evaluation.memorandum_file_url);
      
      // Open in new tab
      window.open(data.publicUrl, '_blank');
    } catch (error: any) {
      console.error('Error downloading memorandum:', error);
      toast({
        title: "Download failed",
        description: "Failed to download memorandum.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading evaluations...</p>
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
            All Student Evaluations
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive overview of student performance
          </p>
        </div>

        {evaluations.length === 0 ? (
          <div className="bg-gradient-card rounded-2xl shadow-card p-12 text-center">
            <p className="text-muted-foreground mb-4">No evaluations found.</p>
            <Button variant="default" asChild>
              <a href="/upload">Upload First Evaluation</a>
            </Button>
          </div>
        ) : (
          <div className="bg-gradient-card rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-hero/10">
                  <TableHead className="font-semibold text-foreground">Student Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Assignment</TableHead>
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Score</TableHead>
                  <TableHead className="font-semibold text-foreground">Download Memo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map((evaluation) => (
                  <TableRow key={evaluation.id} className="hover:bg-secondary/20 transition-colors">
                    <TableCell className="font-medium text-foreground">
                      {evaluation.submissions?.profiles?.full_name || 'Unknown Student'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
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
                        onClick={() => downloadMemorandum(evaluation)}
                        disabled={!evaluation.memorandum_file_url}
                      >
                        {evaluation.memorandum_file_url ? 'Download' : 'Generating...'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {evaluations.length} evaluations • Export available
          </p>
          <div className="space-x-4">
            <Button variant="outline">
              Export CSV
            </Button>
            <Button variant="default">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResults;