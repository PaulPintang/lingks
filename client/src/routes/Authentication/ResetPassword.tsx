import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { GiBookmarklet } from "react-icons/gi";
import { reset } from "../../features/auth/authSlice";
import { AppDispatch, RootState } from "../../app/store";
import { resetPassword } from "../../features/recover/recoverSlice";
import Loader from "../../components/Loader";
import Logo from "../../components/Logo";

export interface User {
  name?: string;
  email: string;
  password: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { status } = useSelector((state: RootState) => state.recover);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    user && navigate("/bookmarks");
  }, []);

  useEffect(() => {
    !localStorage.getItem("session") && navigate("/");
    return () => {
      localStorage.removeItem("session");
    };
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password == confirmPassword) {
      const user: User = {
        email,
        password,
      };
      // payload return true if response id success
      return dispatch(resetPassword(user)).then(
        (res) => res.payload && navigate("/")
      );
    }
    setError("Those passwords didn't match. Try again");
  };

  return (
    <Container className="w-full max-w-[340px] lg:ma-w-100px mx-auto">
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <form onSubmit={onSubmit} className="space-y-4">
            <Title order={2} className="text-center">
              Reset your password
            </Title>
            <PasswordInput
              size="md"
              icon={<MdLockOutline />}
              placeholder="Password"
              label="New password"
              withAsterisk
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              spellCheck={false}
            />
            <PasswordInput
              size="md"
              icon={<MdLockOutline />}
              my={13}
              placeholder="Confirm password"
              label="Confirm new password"
              withAsterisk
              value={confirmPassword}
              error={error}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              spellCheck={false}
            />
            <Button
              size="md"
              type="submit"
              className="bg-green-500 hover:bg-green-400 transition-all"
              fullWidth
              disabled={password.length < 6}
              mb={7}
              loading={status === "pending" && true}
            >
              {status === "pending" ? "Updating" : "Change password"}
            </Button>
          </form>
          <Text className="text-sm text-gray-600 text-center" fw={700}>
            lingks is your bookmark for saving important topics, organizing your
            links, and making them easily accessible.
          </Text>
          <Logo />
        </div>
      </Center>
    </Container>
  );
};

export default ResetPassword;
