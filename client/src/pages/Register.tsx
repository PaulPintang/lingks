import { useEffect, useState } from "react";
import { createUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  TextInput,
  PasswordInput,
  Flex,
  Text,
  Title,
  Container,
  UnstyledButton,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

export interface User {
  name?: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [name, email, password]);

  useEffect(() => {
    localStorage.getItem("token") && navigate("/me");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newUser: User = {
      name,
      email,
      password,
    };
    name && email && password && setProcessing(true);
    const returnUser = await createUser(newUser, setProcessing, setError);
    returnUser && navigate("/");
  };

  return (
    <Container className="max-w-[340px] px-6">
      <Center className="w-full h-screen">
        <div className="space-y-10 text-center">
          <Title order={1} className="text-[40px] text-gray-700">
            Sign Up
          </Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              size="md"
              icon={<FaRegUserCircle />}
              placeholder="Your name"
              value={name}
              error={error?.toLowerCase().includes("name") && error}
              onChange={(e) => setName(e.target.value)}
            />
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
            <div className="flex text-sm justify-center gap-1 text-gray-700">
              <Text fw={500}>Have an account?</Text>
              <Text fw={500}>
                <Link to="/" className="no-underline text-blue-500">
                  Sign in
                </Link>
              </Text>
            </div>
          </form>
          <Text className="text-sm text-gray-700" fw={500}>
            linkd is your bookmark to save your important links, organized and
            accessible.
          </Text>
          <Title className="text-[26px]">
            <span className="">linkd.io</span>
          </Title>
        </div>
      </Center>
    </Container>
  );
};

export default Register;
