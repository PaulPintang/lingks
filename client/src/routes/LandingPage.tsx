import { Center, Flex, Title, Text, Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import bookmark from "../assets/bookmark.png";
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useAppSelector } from "../app/hooks";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    user && navigate("/bookmarks");
  }, []);

  return (
    <>
      <Header />
      <Center className="w-full h-[calc(100vh-7rem)] lg:h-[calc(100vh-146px)] md:h-[calc(100vh-146px)] px-3">
        <Flex
          justify="center"
          align="center"
          direction="column"
          className="w-full"
        >
          <img src={bookmark} className="w-[420px]" alt="" />
          <Title order={1} className="text-center">
            Bring all your link together
          </Title>
          <Text
            className=" text-gray- text-center max-w-sm"
            c="dimmed"
            fw={500}
            py={5}
          >
            lingks is your bookmark for saving important topics, organizing your
            links, and making them easily accessible.
          </Text>

          <Link to="/register">
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              mt={20}
              size="md"
            >
              Get started
            </Button>
          </Link>
        </Flex>
      </Center>
      <Footer />
    </>
  );
};

export default LandingPage;
