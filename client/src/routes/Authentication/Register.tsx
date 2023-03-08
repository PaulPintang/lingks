import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  TextInput,
  PasswordInput,
  Text,
  Title,
  Container,
} from "@mantine/core";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { register, reset } from "../../features/auth/authSlice";
import Loader from "../../components/Loader";
import Logo from "../../components/Logo";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { status, error } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") && navigate("bookmarks");
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    status === "succeeded" && navigate("/");
  }, [status]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    dispatch(register(newUser));
  };

  return (
    <Container className="w-full max-w-[340px] lg:ma-w-100px mx-auto">
      <Loader />
      <Center className="w-full h-screen">
        <div className="space-y-10">
          <Title order={1} className="text-[40px] text-gray-700 text-center">
            Sign Up
          </Title>
          <form onSubmit={onSubmit} className="space-y-4">
            <TextInput
              size="md"
              icon={<FaRegUserCircle />}
              placeholder="Your name"
              value={name}
              error={error?.toLowerCase().includes("name") && error}
              onChange={(e) => {
                setName(e.target.value);
                dispatch(reset());
              }}
            />
            <TextInput
              size="md"
              icon={<MdAlternateEmail />}
              placeholder="Your email"
              value={email}
              error={error?.toLowerCase().includes("email") && error}
              onChange={(e) => {
                setEmail(e.target.value);
                dispatch(reset());
              }}
            />
            <PasswordInput
              size="md"
              icon={<MdLockOutline />}
              placeholder="Password"
              value={password}
              error={error?.toLowerCase().includes("password") && error}
              onChange={(e) => {
                setPassword(e.target.value);
                dispatch(reset());
              }}
            />
            <Button type="submit" size="md" variant="outline" fullWidth>
              {status === "pending" ? "Signing up..." : "Sign up"}
            </Button>
            <div className="flex text-sm justify-center gap-1 text-gray-700">
              <Text fw={500}>Have an account?</Text>
              <Text fw={500}>
                <Link to="/" className="no-underline text-blue-500">
                  Sign in
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

export default Register;
