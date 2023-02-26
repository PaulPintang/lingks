import { useEffect, useState } from "react";
import { createUser } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  TextInput,
  PasswordInput,
  Text,
  Title,
  Container,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";

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
        <div className="space-y-10">
          <Title order={1} className="text-[40px] text-gray-700 text-center">
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
          <Text className="text-sm text-gray-600 text-center" fw={700}>
            linkd.io is your bookmark for saving important topics, organizing
            your links, and making them easily accessible.
          </Text>
          <div className="flex items-center justify-center gap-2">
            <GiBookmarklet size={25} className="text-purple-500" />
            <Title className="text-[26px]">
              <Link to="/" className="no-underline text-gray-800">
                <span className="">linkd.io</span>
              </Link>
            </Title>
          </div>
        </div>
      </Center>
    </Container>
  );
};

export default Register;
