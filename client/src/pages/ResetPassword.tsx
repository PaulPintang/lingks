import { useEffect, useState } from "react";
import { handleChangePass } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  PasswordInput,
  Text,
  Container,
  Title,
  Center,
  Alert,
} from "@mantine/core";
import { MdLockOutline } from "react-icons/md";

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
    <Container className="max-w-[340px] px-6">
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Title order={2} className="text-center">
              Reset your password
            </Title>
            {error?.includes("expired") && (
              <Alert className="bg-red-50">{error}</Alert>
            )}
            <PasswordInput
              size="md"
              icon={<MdLockOutline />}
              placeholder="Password"
              label="New password"
              withAsterisk
              error={error?.toLowerCase().includes("length") && error}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              size="md"
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
            <Button
              size="md"
              type="submit"
              className="bg-green-500"
              fullWidth
              mb={7}
            >
              {processing ? "Updating" : "Set new password"}
            </Button>
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

export default ResetPassword;
