import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-gradient-card p-8 rounded-xl shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in">
      <div className="w-14 h-14 bg-gradient-hero rounded-lg flex items-center justify-center mb-6 shadow-soft">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;