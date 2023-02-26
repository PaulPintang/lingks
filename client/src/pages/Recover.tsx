import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleOTP } from "../utils/auth";
import axios from "axios";
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
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { User } from "./Register";

const Recover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<number | null>(null);
  const [OTP, setOTP] = useState<number | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [email]);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    localStorage.getItem("token") && navigate("/me");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    email && setProcessing(true);
    const res = await handleOTP({ email: email }, setProcessing, setError);
    res && setStatus(res);
    status && setProcessing(false);
  };

  const verifyOTP = async () => {
    setProcessing(true);
    try {
      const res = await axios.get("/api/user/verify", {
        params: { OTP },
      });
      const session = res.data;
      if (session === true) {
        navigate("/reset");
        localStorage.setItem("email", email);
      }
      setError("Invalid OTP");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Container className="max-w-[340px] px-6">
      <Center className="w-full h-screen">
        <div className="space-y-10 text-center">
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 200 ? (
              <>
                <Center>
                  <Title order={3}>Verify email</Title>
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
                    setError(null);
                  }}
                  error={error}
                />

                <Button
                  size="md"
                  color="green"
                  fullWidth
                  mb={7}
                  disabled={OTP!?.toString().length >= 6 ? false : true}
                  onClick={verifyOTP}
                >
                  {/* {processing ? "Verifying..." : "Continue"} */}
                  Continue
                </Button>

                <div className="flex text-sm justify-center gap-1 text-gray-700">
                  <Text fw={500}>Didn't receive code?</Text>
                  <UnstyledButton type="submit">
                    <Text
                      fw={500}
                      fz="sm"
                      className="no-underline text-green-500"
                    >
                      Resend
                    </Text>
                  </UnstyledButton>
                </div>
              </>
            ) : (
              <>
                <Center>
                  <Title order={2}>Forgot your password?</Title>
                </Center>
                <Text fz="sm" align="center">
                  Enter your email address and we will send an OTP to recover
                  your password
                </Text>

                <TextInput
                  size="md"
                  my={16}
                  icon={<MdAlternateEmail />}
                  withAsterisk
                  placeholder="Your email"
                  value={email}
                  error={error}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  size="md"
                  type="submit"
                  fullWidth
                  mb={10}
                  disabled={email.length >= 12 ? false : true}
                >
                  {processing ? "Sending..." : "Send"}
                </Button>

                <div className="flex text-sm justify-center gap-1 text-gray-700">
                  <Text fw={500}>Dont have an account?</Text>
                  <Text fw={500}>
                    <Link to="/register" className="no-underline text-blue-500">
                      Sign up
                    </Link>
                  </Text>
                </div>
              </>
            )}
          </form>
          <Text className="text-sm text-gray-600" fw={700}>
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

export default Recover;
