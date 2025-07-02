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

const StudentResults = () => {
  const results = [
    { subject: "Science", date: "2025-06-25", marks: "18/25", status: "completed" },
    { subject: "Maths", date: "2025-06-18", marks: "22/25", status: "completed" },
    { subject: "English", date: "2025-06-12", marks: "20/25", status: "completed" }
  ];

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

        <div className="bg-gradient-card rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-hero/10">
                <TableHead className="font-semibold text-foreground">Subject</TableHead>
                <TableHead className="font-semibold text-foreground">Date</TableHead>
                <TableHead className="font-semibold text-foreground">Marks</TableHead>
                <TableHead className="font-semibold text-foreground">View Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index} className="hover:bg-secondary/20 transition-colors">
                  <TableCell className="font-medium text-foreground">{result.subject}</TableCell>
                  <TableCell className="text-muted-foreground">{result.date}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-primary">{result.marks}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

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