import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Title,
  Text,
  Container,
  TextInput,
  Center,
  NumberInput,
  UnstyledButton,
} from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { GiBookmarklet } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, verifyOTP, reset } from "../features/recover/recoverSlice";
import { AppDispatch, RootState } from "../app/store";

const Recover = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const { status, error } = useSelector((state: RootState) => state.recover);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    localStorage.getItem("token") && navigate("/me");

    return () => {
      dispatch(reset());
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendOTP(email)).then(
      (res) => res.payload === 200 && navigate("/verify")
    );
  };

  return (
    <Container className="max-w-[340px] px-6">
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
            />

            <Button
              size="md"
              type="submit"
              fullWidth
              mb={10}
              disabled={email.length >= 12 ? false : true}
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

export default Recover;
