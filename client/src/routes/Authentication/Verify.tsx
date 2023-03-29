import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Title,
  Text,
  Container,
  Center,
  PinInput,
  Flex,
} from "@mantine/core";
import { sendOTP, verifyOTP, reset } from "../../features/recover/recoverSlice";
import Logo from "../../components/Logo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Verify = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const { status, error } = useAppSelector((state) => state.recover);
  const { user } = useAppSelector((state) => state.auth);
  const [resend, setResend] = useState<boolean>(false);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    user && navigate("/bookmarks");

    return () => {
      dispatch(reset());
      setResend(false);
    };
  }, []);

  useEffect(() => {
    !localStorage.getItem("session") && navigate("/");
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResend(true);
    dispatch(sendOTP(email)).then(() => setResend(false));
  };

  const onVerify = () => {
    const toInteger = parseInt(OTP);
    dispatch(verifyOTP(toInteger)).then(
      (res) => res.payload === true && navigate("/reset")
    );
  };

  return (
    <Container className="w-full max-w-[340px] lg:ma-w-100px mx-auto">
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <form onSubmit={onSubmit} className="space-y-4">
            <Center>
              <Title order={2}>Verify email</Title>
            </Center>
            <Text fz="sm" align="center">
              Enter the 6 digit code we sent to your email
            </Text>

            <Center>
              <PinInput
                size="lg"
                length={6}
                type="number"
                onChange={(value) => {
                  setOTP(value);
                  dispatch(reset());
                }}
                error={error ? true : false}
              />
            </Center>

            <Button
              size="md"
              type="button"
              onClick={onVerify}
              color="green"
              fullWidth
              mb={7}
              disabled={OTP!?.toString().length >= 6 ? false : true}
              loading={status === "pending" && !resend && true && true}
            >
              {status === "pending" && !resend && true
                ? "Verifying..."
                : "Continue"}
            </Button>

            <Flex justify="center" align={"center"} gap={6}>
              <Text fw={500} fz="sm" pb={2.2}>
                Didn't receive code?
              </Text>
              <Button
                type="submit"
                variant="white"
                color={"teal"}
                p={0}
                m={0}
                size="sm"
                loading={resend}
              >
                Resend
              </Button>
            </Flex>
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

export default Verify;
