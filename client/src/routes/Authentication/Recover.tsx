import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Title,
  Text,
  Container,
  TextInput,
  Center,
} from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { sendOTP, reset } from "../../features/recover/recoverSlice";
import Logo from "../../components/Logo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Recover = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const { status, error } = useAppSelector((state) => state.recover);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    user && navigate("/bookmarks");

    return () => {
      dispatch(reset());
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendOTP(email)).then(
      (res: any) => res.payload === true && navigate("/verify")
    );
  };

  return (
    <Container className="w-full max-w-[340px] lg:ma-w-100px mx-auto">
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <form onSubmit={onSubmit} className="space-y-4">
            <Center>
              <Title order={2}>Forgot your password?</Title>
            </Center>
            <Text fz="sm" align="center">
              Enter your email address and we will send an OTP to recover your
              password
            </Text>

            <TextInput
              size="md"
              my={16}
              icon={<MdAlternateEmail />}
              withAsterisk
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                dispatch(reset());
              }}
              error={error}
              spellCheck={false}
            />

            <Button
              size="md"
              type="submit"
              fullWidth
              mb={10}
              disabled={email.length >= 12 ? false : true}
              loading={status === "pending" && true}
            >
              {status === "pending" ? "Sending..." : "Send"}
            </Button>
            <div className="flex text-sm justify-center gap-1">
              <Text fw={500}>Don't have an account?</Text>
              <Text fw={500}>
                <Link to="/register" className="no-underline text-blue-500">
                  Sign up
                </Link>
              </Text>
            </div>
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

export default Recover;
