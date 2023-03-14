import { Center, Flex, Title, Text, Button } from "@mantine/core";
import bookmark from "../assets/bookmark.png";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import Loader from "./Loader";

interface Props {
  open?: () => void;
}

const BookmarkEmptyState = ({ open }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Center className="w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-120px)] md:h-[calc(100vh-120px)]">
      <Loader />
      <Flex
        justify="center"
        align="center"
        direction="column"
        className="w-full"
      >
        <img src={bookmark} className="w-[430px]" alt="" />
        <Title order={1} className="text-center">
          {user
            ? "Start by creating a bookmark"
            : "Bring all your link together"}
        </Title>
        <Text
          className=" text-gray- text-center max-w-sm"
          c="dimmed"
          fw={500}
          py={5}
        >
          {user
            ? "A bookmark that organizes your important links and makes them easy to find when you need them."
            : "lingks is your bookmark for saving important topics, organizing your links, and making them easily accessible."}
        </Text>
        {user ? (
          <Button onClick={open} leftIcon={<AiOutlinePlus />} size="md" mt={20}>
            Create bookmark
          </Button>
        ) : (
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
        )}
      </Flex>
    </Center>
  );
};

export default BookmarkEmptyState;
