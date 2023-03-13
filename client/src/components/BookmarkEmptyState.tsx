import React, { useEffect } from "react";
import {
  Center,
  Flex,
  Title,
  Text,
  Button,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import bookmark from "../assets/bookmark.png";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
// import { profile } from "../features/auth/authSlice";
import { getBookmarks } from "../features/bookmarks/bookmarkSlice";
import { Link } from "react-router-dom";

interface Props {
  open?: () => void;
}

const BookmarkEmptyState = ({ open }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <Center className="w-full h-[calc(100vh-6rem)] lg:h-[calc(100vh-120px)] md:h-[calc(100vh-120px)]">
      <Flex
        justify="center"
        align="center"
        direction="column"
        className="w-full"
      >
        <img src={bookmark} className="w-[430px]" alt="" />
        <Title order={1}>
          {user
            ? "Start by creating a bookmark"
            : "Bring all your link together"}
        </Title>
        <Text
          className="text-sm text-gray- text-center max-w-sm"
          c="dimmed"
          fw={500}
          py={5}
        >
          {user
            ? "A bookmark that organizes your important links and makes them easy to find when you need them."
            : "lingks is your bookmark for saving important topics, organizing your links, and making them easily accessible."}
        </Text>
        {user ? (
          <Button onClick={open} leftIcon={<AiOutlinePlus />} mt={20}>
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
