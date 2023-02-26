import { useEffect, useState } from "react";
import { handleChangePass } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  TextInput,
  PasswordInput,
  Flex,
  Text,
  Container,
  Title,
  Center,
  Alert,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";

export interface User {
  name?: string;
  email: string;
  password: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    localStorage.getItem("token") && navigate("/me");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user: User = {
      email,
      password,
    };
    setProcessing(true);
    if (password === confirmPassword) {
      const res = await handleChangePass(user, setError);
      setProcessing(false);
      res && navigate("/");
    } else {
      setError("Password did not match!");
      setProcessing(false);
    }
  };

  return (
    <Container>
      <Center style={{ width: "100%", height: "100vh" }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: 340, padding: 10 }}
        >
          <Title order={3} mb={5}>
            Create your new password
          </Title>
          <Text c="dimmed">
            Almost done. Enter your new password and youre all set
          </Text>
          {error?.includes("expired") && (
            <Alert mt={10} color="red">
              {error}
            </Alert>
          )}
          <PasswordInput
            icon={<MdLockOutline />}
            my={13}
            placeholder="Password"
            label="New password"
            withAsterisk
            error={error?.toLowerCase().includes("length") && error}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            icon={<MdLockOutline />}
            my={13}
            placeholder="Confirm password"
            label="Confirm new password"
            withAsterisk
            value={confirmPassword}
            error={error?.toLowerCase().includes("match") && error}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null);
            }}
          />
          <Button type="submit" color="green" fullWidth mb={7}>
            {processing ? "Updating" : "Set new password"}
          </Button>
        </form>
      </Center>
    </Container>
  );
};

export default ResetPassword;
