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
    <Container>
      <Center style={{ width: "100%", height: "100vh" }}>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: 340, padding: 10 }}
        >
          {status === 200 ? (
            <>
              <Center>
                <Title order={3}>Verify email</Title>
              </Center>
              <Text fz="sm" align="center">
                Enter the 6 digit code we sent to your email
              </Text>

              <NumberInput
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
                color="green"
                fullWidth
                mb={7}
                disabled={OTP!?.toString().length >= 6 ? false : true}
                onClick={verifyOTP}
              >
                {/* {processing ? "Verifying..." : "Continue"} */}
                Continue
              </Button>

              <Text fz="sm" align="center">
                Didn't receive code? {""}
                <UnstyledButton type="submit">
                  <Text fz="sm" align="center" color="green">
                    Resend
                  </Text>
                </UnstyledButton>
              </Text>
            </>
          ) : (
            <>
              <Center>
                <Title order={3}>Forgot your password?</Title>
              </Center>
              <Text fz="sm" align="center">
                Enter your email address and we will send an OTP to recover your
                password
              </Text>

              <TextInput
                my={16}
                icon={<MdAlternateEmail />}
                withAsterisk
                placeholder="Your email"
                value={email}
                error={error}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                mb={10}
                disabled={email.length >= 12 ? false : true}
              >
                {processing ? "Sending..." : "Send"}
              </Button>

              <Text fz="sm" align="center">
                Don't have an account? {""}
                <UnstyledButton type="submit">
                  <Link to="/register">
                    <Text fz="sm" align="center" color="blue">
                      Register
                    </Text>
                  </Link>
                </UnstyledButton>
              </Text>
            </>
          )}
        </form>
      </Center>
    </Container>
  );
};

export default Recover;
