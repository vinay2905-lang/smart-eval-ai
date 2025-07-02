import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const DashboardCard = ({ title, icon: Icon, description, buttonText, buttonLink }: DashboardCardProps) => {
  return (
    <div className="bg-gradient-card p-8 rounded-xl shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-hero rounded-xl flex items-center justify-center shadow-soft">
          <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
          <Button variant="default" asChild>
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;