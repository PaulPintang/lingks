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
  return (
    <Center className="w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-120px)] md:h-[calc(100vh-120px)]">
      <Flex
        justify="center"
        align="center"
        direction="column"
        className="w-full"
      >
        <img src={bookmark} className="w-[430px]" alt="" />
        <Title order={1} className="text-center">
          Start by creating a bookmark
        </Title>
        <Text
          className=" text-gray- text-center max-w-sm"
          c="dimmed"
          fw={500}
          py={5}
        >
          A bookmark that organizes your important links and makes them easy to
          find when you need them
        </Text>
        <Button onClick={open} leftIcon={<AiOutlinePlus />} size="md" mt={20}>
          Create bookmark
        </Button>
      </Flex>
    </Center>
  );
};

export default BookmarkEmptyState;
