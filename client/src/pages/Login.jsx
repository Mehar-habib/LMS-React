import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;

    await action(inputData);
  };

  useEffect(() => {
    if (isRegisterSuccess && registerData) {
      toast.success(registerData.message || "User registered successfully");
    }
    if (registerError) {
      toast.error(registerError.data.message || "signup failed");
    }
    if (isLoginSuccess && loginData) {
      toast.success(loginData.message || "User logged in successfully");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "login failed");
    }
  }, [
    isRegisterSuccess,
    registerData,
    registerError,
    isLoginSuccess,
    loginData,
    loginError,
  ]);
  return (
    <div className="flex items-center justify-center w-full mt-24">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="signup">
          <TabsList className="w-full">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>SignUp</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you&apos;re done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Pedro Duarte"
                    required
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="name"
                    value={signupInput.name}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="test@me.com"
                    required
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="email"
                    value={signupInput.email}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="********"
                    required
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="password"
                    value={signupInput.password}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isRegisterLoading}
                  onClick={() => handleRegistration("signup")}
                >
                  {isRegisterLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please
                      wait
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login your password here. After signup, you'll be logged in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="test@me.com"
                    required
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="email"
                    value={loginInput.email}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="********"
                    required
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="password"
                    value={loginInput.password}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={isLoginLoading}
                  onClick={() => handleRegistration("login")}
                >
                  {isLoginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
