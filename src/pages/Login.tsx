import AuthForm from "@/components/AuthForm";

const Login = () => {
  const formData = {
    title: "Login to Smart Evaluator",
    tabs: ["Student", "Admin"],
    fields: [
      { label: "Email", type: "email" },
      { label: "Password", type: "password" }
    ],
    buttonText: "Login",
    extraText: "New here?",
    linkText: "Sign up",
    linkPath: "/signup"
  };

  return <AuthForm {...formData} />;
};

export default Login;