import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Grid,
  Card,
  Badge,
  Flex,
  Image,
  Text,
  Input,
  Button,
  ActionIcon,
  Title,
} from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { RxLink2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import AddLinksModal from "./AddLinksModal";
import EditGroupModal from "./EditGroupModal";
import DropGroupModal from "./DropGroupModal";
import EditLinkModal from "./EditLinkModal";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { getBookmarks } from "../../../features/bookmarks/bookmarkSlice";
import { BiArrowBack } from "react-icons/bi";

const BookmarkView = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks } = useSelector((state: RootState) => state.bookmark);
  const [opened, { open, close }] = useDisclosure(false);
  const [editGroup, editGroupHandlers] = useDisclosure(false);
  const [dropGroup, dropGroupHandlers] = useDisclosure(false);
  const [editLink, editLinkHandlers] = useDisclosure(false);
  const [index, setIndex] = useState<number>(0);

  const bookmark = bookmarks.filter((bm) => bm._id === id);

  useEffect(() => {
    dispatch(getBookmarks(localStorage.getItem("token")!));
  }, []);

  const redugh = "#570a0a";
  return (
    <>
      <Flex
        align="center"
        gap="sm"
        className=" sticky lg:top-[100px] md:top-[100px] top-[60px] z-10 bg-white pb-3"
      >
        <Link to="/bookmarks">
          <ActionIcon>
            <BiArrowBack size={22} className="text-gray-500" />
          </ActionIcon>
        </Link>
        <Title order={1}>Bookmarks</Title>
      </Flex>
      <Grid>
        <Grid.Col lg={4} md={4} sm={5}>
          {bookmark.map((bookmark, index) => (
            <Card
              key={index}
              className="lg:w-[295px] md:w-[295px] w-full lg:fixed md:fixed"
            >
              <Card.Section>
                <Image src={bookmark.banner} height={100} alt="Banner img" />
              </Card.Section>
              <Card.Section p={13}>
                <div>
                  <Flex justify="space-between" align="center">
                    <Text weight={600}>{bookmark.title}</Text>
                    <Flex gap={5}>
                      <ActionIcon
                        onClick={() => dropGroupHandlers.open()}
                        color="red"
                        variant="light"
                      >
                        <BiTrash />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => {
                          editGroupHandlers.open();
                        }}
                        color="green"
                        variant="light"
                      >
                        <BiEdit />
                      </ActionIcon>
                    </Flex>
                  </Flex>
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
          ))}
        </Grid.Col>
        <Grid.Col lg={8} md={8} sm={7} className="bg-red -500 w-full">
          <Flex className="sticky lg:top-[156px] md:top-[150px] top-[110px] pb-4 bg-white z-10">
            <Flex align="center" gap={10} className="w-full">
              <Input
                size="sm"
                className="lg:w-[240px] md:w-[240px] w-full"
                placeholder="Search your bookmark..."
              />
              <Button color="blue" size="sm">
                Search
              </Button>
            </Flex>

            <ActionIcon
              onClick={open}
              className="lg:static md:static bg-green-500 hover:bg-green-400 transition-all fixed bottom-10 right-4 z-10"
              variant="filled"
              size="lg"
            >
              <AiOutlinePlus />
            </ActionIcon>
          </Flex>
          <Flex
            className="w-full"
            rowGap={12}
            wrap="wrap"
            justify="space-between"
            gap={5}
          >
            {bookmark[0]?.links.map((link, index) => (
              <Card
                key={index}
                px={10}
                py={6}
                withBorder
                radius={10}
                className="lg:w-[298px] md:w-[298px] w-full cursor-pointer hover:bg-gray-100 transition-all"
              >
                <Flex justify="space-between" align="center">
                  <Text
                    className="lg:text-[12.3px] text-sm text-gray-800"
                    fw={600}
                  >
                    {link.name}
                  </Text>
                  <ActionIcon
                    onClick={() => {
                      setIndex(index);
                      editLinkHandlers.open();
                    }}
                    color="gray"
                    variant="light"
                  >
                    <BiEdit />
                  </ActionIcon>
                </Flex>
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
              </Card>
            ))}
          </Flex>
        </Grid.Col>
        <AddLinksModal opened={opened} close={close} />
        <EditGroupModal opened={editGroup} close={editGroupHandlers.close} />
        <DropGroupModal opened={dropGroup} close={dropGroupHandlers.close} />
        <EditLinkModal
          opened={editLink}
          close={editLinkHandlers.close}
          index={index}
        />
      </Grid>
    </>
  );
};

export default BookmarkView;
