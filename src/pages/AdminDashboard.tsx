import { Upload, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";

const AdminDashboard = () => {
  const sections = [
    {
      title: "Upload Data",
      icon: Upload,
      description: "Upload question paper, answer key, and student answer sheets.",
      buttonText: "Go to Upload Page",
      buttonLink: "/upload"
    },
    {
      title: "View Evaluated Results",
      icon: List,
      description: "See evaluation summary for all students.",
      buttonText: "View Results",
      buttonLink: "/admin-results"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage evaluations and view student results
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

export default AdminDashboard;