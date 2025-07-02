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

const AdminResults = () => {
  const results = [
    { name: "Ritika S.", hallTicket: "HT1234", subject: "Science", marks: "18/25" },
    { name: "Raj V.", hallTicket: "HT1342", subject: "Maths", marks: "22/25" },
    { name: "Priya M.", hallTicket: "HT1567", subject: "English", marks: "20/25" },
    { name: "Arjun K.", hallTicket: "HT1890", subject: "Science", marks: "23/25" }
  ];

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

        <div className="bg-gradient-card rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-hero/10">
                <TableHead className="font-semibold text-foreground">Student Name</TableHead>
                <TableHead className="font-semibold text-foreground">Hall Ticket</TableHead>
                <TableHead className="font-semibold text-foreground">Subject</TableHead>
                <TableHead className="font-semibold text-foreground">Marks</TableHead>
                <TableHead className="font-semibold text-foreground">Download Memo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index} className="hover:bg-secondary/20 transition-colors">
                  <TableCell className="font-medium text-foreground">{result.name}</TableCell>
                  <TableCell className="text-muted-foreground">{result.hallTicket}</TableCell>
                  <TableCell className="text-muted-foreground">{result.subject}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-primary">{result.marks}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {results.length} evaluations • Export available
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