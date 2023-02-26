import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin, userLoggedIn } from "../utils/auth";
import {
  Button,
  Title,
  PasswordInput,
  Flex,
  Text,
  Container,
  TextInput,
  Center,
  UnstyledButton,
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
    <Container>
      <Center style={{ width: "100%", height: "100vh" }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: 340, padding: 10 }}
        >
          <Title order={2}>Hi, Welcome back!</Title>
          <Text c="dimmed" mb={15}>
            Please enter your details
          </Text>

          <TextInput
            icon={<MdAlternateEmail />}
            withAsterisk
            label="Email"
            placeholder="Your email"
            value={email}
            error={error?.toLowerCase().includes("email") && error}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            icon={<MdLockOutline />}
            my={15}
            placeholder="Password"
            label="Password"
            withAsterisk
            value={password}
            error={error?.toLowerCase().includes("password") && error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/recover">
            <Text fz="xs" align="right" my={13} c="dimmed">
              Forgot password?
            </Text>
          </Link>

          <Flex justify="space-between" align="center">
            <Text fz="xs" align="center">
              Don't have an account? {""}
              <UnstyledButton type="submit">
                <Link to="/register">
                  <Text fz="xs" align="center" color="blue">
                    Register
                  </Text>
                </Link>
              </UnstyledButton>
            </Text>
            <Button type="submit">
              {processing ? "Signing in..." : "Sign in"}
            </Button>
          </Flex>
        </form>
      </Center>
    </Container>
  );
};

export default Login;
