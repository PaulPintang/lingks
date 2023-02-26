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
    <Container>
      <Center style={{ width: "100%", height: "100vh" }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: 340, padding: 10 }}
        >
          <Title order={2}>Create an account</Title>
          <Text c="dimmed" mb={15}>
            Please enter your details
          </Text>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            value={name}
            error={error?.toLowerCase().includes("name") && error}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            icon={<MdAlternateEmail />}
            mt={13}
            withAsterisk
            label="Email"
            placeholder="Your email"
            value={email}
            error={error?.toLowerCase().includes("email") && error}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            icon={<MdLockOutline />}
            my={13}
            placeholder="Password"
            label="Password"
            withAsterisk
            value={password}
            error={error?.toLowerCase().includes("password") && error}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Flex justify="space-between" align="center" mt={20}>
            <Text fz="xs" align="center">
              Have an account? {""}
              <UnstyledButton type="submit">
                <Link to="/">
                  <Text fz="xs" align="center" color="blue">
                    Login
                  </Text>
                </Link>
              </UnstyledButton>
            </Text>
            <Button type="submit">
              {processing ? "Signing up..." : "Sign up"}
            </Button>
          </Flex>
        </form>
      </Center>
    </Container>
  );
};

export default Register;
