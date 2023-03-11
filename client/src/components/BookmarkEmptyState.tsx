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

interface Props {
  open: () => void;
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
        <Title order={3}>Start by creating a bookmark</Title>
        <Text
          className="text-sm text-gray- text-center max-w-sm"
          c="dimmed"
          fw={500}
          py={5}
        >
          A bookmark that organizes your important links and makes them easy to
          find when you need them.
        </Text>
        <Button onClick={open} leftIcon={<AiOutlinePlus />} mt={20}>
          Create bookmark
        </Button>
      </Flex>
    </Center>
  );
};

export default BookmarkEmptyState;
