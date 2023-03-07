import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Title,
  PasswordInput,
  Text,
  Container,
  TextInput,
  Center,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { GiBookmarklet } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { AppDispatch, RootState } from "../../app/store";
import Loader from "../../components/Loader";
import Logo from "../../components/Logo";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    localStorage.getItem("token") && navigate("/me/bookmarks");
  }, [status]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  return (
    <Container className="w-full max-w-[340px] lg:ma-w-100px mx-auto">
      <Loader />
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                dispatch(reset());
              }}
              error={error?.toLowerCase().includes("email") && error}
            />
            <PasswordInput
              size="md"
              icon={<MdLockOutline />}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                dispatch(reset());
              }}
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
          <Logo />
        </div>
      </Center>
    </Container>
  );
};

export default Login;
