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
import { sendOTP, verifyOTP, reset } from "../../features/recover/recoverSlice";
import { AppDispatch, RootState } from "../../app/store";
import Loader from "../../components/Loader";
import Logo from "../../components/Logo";

const Verify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [OTP, setOTP] = useState<number | null>(null);
  const { status, error } = useSelector((state: RootState) => state.recover);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    localStorage.getItem("token") && navigate("/me/bookmarks");

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    !localStorage.getItem("session") && navigate("/");
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendOTP(email));
  };

  return (
    <Container className="w-full max-w-[340px] lg:ma-w-100px mx-auto">
      <Loader />
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <form onSubmit={onSubmit} className="space-y-4">
            <Center>
              <Title order={2}>Verify email</Title>
            </Center>
            <Text fz="sm" align="center">
              Enter the 6 digit code we sent to your email
            </Text>

            <NumberInput
              size="md"
              my={10}
              hideControls
              value={OTP!}
              onChange={(value) => {
                setOTP(value!);
                dispatch(reset());
              }}
              error={error}
            />

            <Button
              size="md"
              type="button"
              onClick={() =>
                dispatch(verifyOTP(OTP!)).then(
                  (res) => res.payload === true && navigate("/reset")
                )
              }
              color="green"
              fullWidth
              mb={7}
              disabled={OTP!?.toString().length >= 6 ? false : true}
            >
              {status === "pending" ? "Verifying..." : "Continue"}
            </Button>

            <div className="flex text-sm justify-center gap-1 ">
              <Text fw={500}>Didn't receive code?</Text>
              <Text fw={500}>
                <UnstyledButton
                  type="submit"
                  className="text-green-500 text-sm hover:text-green-400 transition-all"
                >
                  Resend
                </UnstyledButton>
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

export default Verify;
