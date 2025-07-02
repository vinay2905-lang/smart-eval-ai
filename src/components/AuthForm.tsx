import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                <form className="space-y-6">
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
                      />
                    </div>
                  ))}

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    {buttonText}
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