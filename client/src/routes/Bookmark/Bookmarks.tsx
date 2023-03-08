import React, { useEffect } from "react";
import { RxLink2 } from "react-icons/rx";
import { Flex, Card, Text, Group, Image, Badge } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { getBookmarks } from "../../features/bookmarks/bookmarkSlice";

export interface ModalPropsInterface {
  opened: boolean;
  close: () => void;
}

const Bookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks, status } = useSelector(
    (state: RootState) => state.bookmark
  );

  useEffect(() => {
    dispatch(getBookmarks());
    console.log("rendered");
  }, []);

  console.log("yeah", bookmarks);

  return (
    <Flex gap={20} py="md" className="w-full" wrap="wrap">
      {bookmarks.map((bookmark) => (
        <Link
          key={bookmark.id}
          to="hello"
          className="no-underline lg:w-[295px] md:w-[295px]  w-full"
        >
          <Card shadow="sm" radius="md" withBorder>
            <Card.Section>
              <Image src={bookmark.banner} height={100} alt="React" />
            </Card.Section>
            <Card.Section p={13} pb={18}>
              <div>
                <Text weight={600}>{bookmark.title}</Text>
                <Text c="dimmed" fz="sm">
                  {bookmark.description}
                </Text>
                <Flex gap={10} align="center" className="text-sm">
                  <Text c="dimmed" fw={600}>
                    Bookmarks:
                  </Text>
                  <Text>{bookmarks.length} links</Text>
                </Flex>
                <Flex className="py-2" gap={5} wrap="wrap">
                  {bookmark.labels.map((label) => (
                    <Badge color="pink" variant="light" className="normal-case">
                      {label}
                    </Badge>
                  ))}
                </Flex>
              </div>
              {/* {bookmark.map((link) => (
                <Card
                  px={10}
                  py={6}
                  mt={10}
                  withBorder
                  radius={10}
                  className="cursor-pointer hover:bg-gray-50 transition-all"
                >
                  <Text className="text-[12.3px] text-gray-800" fw={600}>
                    {link.name}
                  </Text>
                  <Flex className="text-gray-400" align="center" gap={5}>
                    <RxLink2 size={14} />
                    <Text c="dimmed" fz="xs" className="truncate w-full">
                      {link.link}
                    </Text>
                  </Flex>
                  <Flex gap={10} align="center" className="text-xs">
                    <Text c="dimmed" fw={600}>
                      Date Added:
                    </Text>
                    <Text className="bg-gray-100 text-gray-800 px-2 rounded-md">
                      {link.date}
                    </Text>
                  </Flex>
                  <Text c="dimmed" fz="xs" fs="italic">
                    recently added
                  </Text>
                </Card>
              ))} */}
            </Card.Section>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default Bookmarks;
