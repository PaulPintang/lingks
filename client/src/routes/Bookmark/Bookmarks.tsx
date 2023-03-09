import React, { useEffect } from "react";
import { RxLink2 } from "react-icons/rx";
import {
  Flex,
  Card,
  Text,
  Group,
  Image,
  Badge,
  Title,
  Skeleton,
} from "@mantine/core";
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
    dispatch(getBookmarks(localStorage.getItem("token")!));
  }, []);

  return (
    <>
      <div className="sticky lg:top-[100px] md:top-[100px] top-[60px] z-10 bg-white pb-3">
        <Title order={1}>Bookmarks</Title>
      </div>
      <Flex gap={20} className="w-full" wrap="wrap">
        {bookmarks.map((bookmark) => (
          <Link
            key={bookmark._id}
            to={`${bookmark._id}`}
            className="no-underline lg:w-[295px] md:w-[295px] w-full active:opacity-90 transition-all"
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
                    <Text>{bookmark.links.length} links</Text>
                  </Flex>
                  <Flex className="py-2" gap={5} wrap="wrap">
                    {bookmark.labels.map((label, index) => (
                      <Badge
                        key={index}
                        style={{ background: label.color }}
                        variant="filled"
                        className="normal-case"
                      >
                        {label.label}
                      </Badge>
                    ))}
                  </Flex>
                </div>
              </Card.Section>
            </Card>
          </Link>
        ))}
      </Flex>
    </>
  );
};

export default Bookmarks;
