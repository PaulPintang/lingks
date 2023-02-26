import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin, userLoggedIn } from "../utils/auth";
import {
  Button,
  Title,
  PasswordInput,
  Text,
  Container,
  TextInput,
  Center,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { User } from "./Register";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email, password]);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    localStorage.getItem("token") && navigate("/me");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = {
      email,
      password,
    };
    email && password && setProcessing(true);
    const returnToken = await handleLogin(user, setProcessing, setError);
    if (returnToken) {
      const user = await userLoggedIn(returnToken);
      setUser(user);
      navigate("/me");
    }
  };

  return (
    <Container className="max-w-[340px] px-6">
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <Title order={1} className="text-[40px] text-gray-700 text-center">
            Sign In
          </Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              size="md"
              icon={<MdAlternateEmail />}
              placeholder="Your email"
              value={email}
              error={error?.toLowerCase().includes("email") && error}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              size="md"
              icon={<MdLockOutline />}
              placeholder="Password"
              value={password}
              error={error?.toLowerCase().includes("password") && error}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" size="md" variant="outline" fullWidth>
              {processing ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-gray-700">
              <div className="flex text-sm justify-center gap-1 ">
                <Text fw={500}>Forgot your password?</Text>
                <Text fw={500}>
                  <Link to="/recover" className="no-underline text-blue-500">
                    Reset password
                  </Link>
                </Text>
              </div>
              <div className="flex text-sm justify-center gap-1">
                <Text fw={500}>Don't have an account?</Text>
                <Text fw={500}>
                  <Link to="/register" className="no-underline text-blue-500">
                    Sign up
                  </Link>
                </Text>
              </div>
            </div>
          </form>
          <Text className="text-sm text-gray-600 text-center" fw={700}>
            linkd.io is your bookmark for saving important topics, organizing
            your links, and making them easily accessible.
          </Text>
          <Title className="text-[26px] text-center">
            <span className="">linkd.io</span>
          </Title>
        </div>
      </Center>
    </Container>
  );
};

export default Login;
