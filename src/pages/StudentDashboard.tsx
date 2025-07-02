import { FileText, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";

const StudentDashboard = () => {
  const sections = [
    {
      title: "Your Evaluations",
      icon: FileText,
      description: "Check your evaluated answers and feedback.",
      buttonText: "View Results",
      buttonLink: "/student-results"
    },
    {
      title: "Start New Evaluation",
      icon: Rocket,
      description: "Upload your answer sheet to get evaluated.",
      buttonText: "Upload Answer Sheet",
      buttonLink: "/student-upload"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Student Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your progress and submit new evaluations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          {sections.map((section, index) => (
            <DashboardCard
              key={index}
              title={section.title}
              icon={section.icon}
              description={section.description}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;