import AuthForm from "@/components/AuthForm";

const Signup = () => {
  const formData = {
    title: "Create Account",
    tabs: ["Student", "Admin"],
    fields: [
      { label: "Full Name", type: "text" },
      { label: "Email", type: "email" },
      { label: "Password", type: "password" },
      { label: "Confirm Password", type: "password" }
    ],
    buttonText: "Sign Up",
    extraText: "Already have an account?",
    linkText: "Login",
    linkPath: "/login"
  };

  return <AuthForm {...formData} />;
};

export default Signup;