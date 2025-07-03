import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Field {
  label: string;
  type: string;
}

interface AuthFormProps {
  title: string;
  tabs: string[];
  fields: Field[];
  buttonText: string;
  extraText: string;
  linkText: string;
  linkPath: string;
}

const AuthForm = ({ title, tabs, fields, buttonText, extraText, linkText, linkPath }: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].toLowerCase());
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (fieldLabel: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldLabel.replace(/\s+/g, '').toLowerCase()]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isSignup = buttonText.toLowerCase().includes('sign up');
      const email = formData.email;
      const password = formData.password;
      const fullName = formData.fullname || '';
      const role = activeTab;

      if (isSignup) {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName,
              role: role
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Check your email!",
          description: "We've sent you a confirmation link. Please check your email and click the link to activate your account.",
        });
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Redirect based on role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }
    } catch (error: any) {
      let errorMessage = error.message;
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password. If you just signed up, please check your email and confirm your account first.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground">Choose your account type</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase()} className="font-medium">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab} value={tab.toLowerCase()}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {fields.map((field, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={field.label.replace(/\s+/g, '').toLowerCase()}>
                        {field.label}
                      </Label>
                      <Input
                        id={field.label.replace(/\s+/g, '').toLowerCase()}
                        type={field.type}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        className="h-12 rounded-lg border-border focus:border-primary shadow-soft"
                        value={formData[field.label.replace(/\s+/g, '').toLowerCase()] || ''}
                        onChange={(e) => handleInputChange(field.label, e.target.value)}
                        required
                      />
                    </div>
                  ))}

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : buttonText}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {extraText}{" "}
              <Link to={linkPath} className="text-primary hover:text-primary-glow font-medium transition-colors">
                {linkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;