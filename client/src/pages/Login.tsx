import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogin, userLoggedIn } from "../utils/auth";
import {
  Button,
  Title,
  PasswordInput,
  Text,
  Container,
  TextInput,
  Center,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { GiBookmarklet } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { AppDispatch, RootState } from "../app/store";

const Login = () => {
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const { status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: email.current!.value,
      password: password.current!.value,
    };
    dispatch(login(user));
  };

  useEffect(() => {
    localStorage.getItem("token") && navigate("/me");
  }, [status]);

  return (
    <Container className="max-w-[340px] px-6">
      {/* <LoadingOverlay
        visible={}
        loader={<Loader variant="bars" />}
        overlayOpacity={1}
      /> */}
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <Title order={1} className="text-[40px] text-gray-700 text-center">
            Sign In
          </Title>
          <form className="space-y-4" onSubmit={onSubmit}>
            <TextInput
              size="md"
              icon={<MdAlternateEmail />}
              placeholder="Your email"
              ref={email!}
              error={error?.toLowerCase().includes("email") && error}
            />
            <PasswordInput
              size="md"
              icon={<MdLockOutline />}
              placeholder="Password"
              ref={password!}
              error={error?.toLowerCase().includes("password") && error}
            />
            <Button type="submit" size="md" variant="outline" fullWidth>
              {status === "pending" ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-gray-700">
              <div className="flex text-sm justify-center gap-1 ">
                <Text fw={500}>Forgot your password?</Text>
                <Text fw={500}>
                  <Link to="/recover" className="no-underline text-blue-500">
                    Reset password
                  </Link>
                </Text>
              </div>
              <div className="flex text-sm justify-center gap-1">
                <Text fw={500}>Don't have an account?</Text>
                <Text fw={500}>
                  <Link to="/register" className="no-underline text-blue-500">
                    Sign up
                  </Link>
                </Text>
              </div>
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

export default Login;
