interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => {
  return (
    <div className="bg-gradient-card p-8 rounded-xl shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
      <div className="text-primary text-4xl mb-4">"</div>
      <p className="text-foreground mb-6 leading-relaxed italic">{quote}</p>
      <div className="border-t border-border pt-4">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;