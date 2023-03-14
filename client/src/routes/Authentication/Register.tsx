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
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const today = new Date();
  const [day, setDay] = useState<string>("");

  useEffect(() => {
    user && navigate("/bookmarks");
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    const format = {
      date: today.toDateString(),
    };

    setDay(`${format.date}`);
  }, []);

  // useEffect(() => {
  //   status === "succeeded" && navigate("/login");
  // }, [status]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newUser = {
      name,
      email,
      password,
      day,
    };
    dispatch(register(newUser))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => {});
  };

  return (
    <Container className="w-full max-w-[340px] lg:ma-w-100px mx-auto">
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
              spellCheck={false}
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
              spellCheck={false}
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
              spellCheck={false}
            />
            <Button
              type="submit"
              size="md"
              fullWidth
              loading={status === "pending" && true}
            >
              Sign up
            </Button>
            <div className="flex text-sm justify-center gap-1 text-gray-700">
              <Text fw={500}>Have an account?</Text>
              <Text fw={500}>
                <Link to="/login" className="no-underline text-blue-500">
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
