import { useState, useEffect } from "react";
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
  Skeleton,
  Paper,
  Highlight,
  ScrollArea,
} from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { RxLink2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import AddLinksModal from "./AddLinksModal";
import EditGroupModal from "./EditBookmarkModal";
import DropGroupModal from "./DropBookmarkModal";
import EditLinkModal from "./EditLinkModal";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useParams, Link } from "react-router-dom";
import {
  getBookmarks,
  resetBookmarkState,
  singleBookmark,
} from "../../../features/bookmarks/bookmarkSlice";
import { BiArrowBack } from "react-icons/bi";
import { updateBookmark } from "../../../features/bookmarks/bookmarkSlice";
import ToasterNotification from "../../../components/ToasterNotification";
import { LinksInterface } from "../../../interfaces/bookmark.interface";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
const BookmarkView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { bookmark, status, isLoading } = useAppSelector(
    (state) => state.bookmark
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [editGroup, editGroupHandlers] = useDisclosure(false);
  const [dropGroup, dropGroupHandlers] = useDisclosure(false);
  const [editLink, editLinkHandlers] = useDisclosure(false, {
    onClose() {
      setIndex(null);
    },
  });
  const [deleting, setDeleting] = useState<boolean>(false);
  const [index, setIndex] = useState<number | null>(null);
  const [query, setQuery] = useState<string>("");

  const [toEdit, setToEdit] = useState<LinksInterface>({} as LinksInterface);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getBookmarks());
    dispatch(singleBookmark(id!));
    return () => {
      dispatch(resetBookmarkState());
    };
  }, []);

  const links = bookmark[0]?.links?.filter((link) => {
    return link.name?.toLowerCase().includes(query.toLowerCase());
  });

  const orderedLinks = links
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const onDelete = (ID: string, i: number) => {
    setDeleting(true);
    setIndex(i);
    const newLinks = links?.filter((link) => link._id !== ID);
    const updated = {
      id,
      links: newLinks,
    };
    dispatch(updateBookmark(updated))
      .unwrap()
      .then(() => {
        setIndex(null);
        setDeleting(false);
        const message = "Link deleted successfully!";
        ToasterNotification(message);
      });
  };

  const onEditClick = (ID: string) => {
    const toEdit = links?.find((link) => link._id === ID);
    setToEdit(toEdit!);
    // setIndex(i);
    setDeleting(false);
    editLinkHandlers.toggle();
  };

  return (
    <>
      <Flex
        align="center"
        gap="sm"
        className="sticky lg:top-[100px] md:top-[100px] top-[57px] z-[1] bg-white pb-3"
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
            <Paper component="div" key={bookmark._id}>
              {status === "pending" ? (
                <Skeleton
                  visible={true}
                  height={200}
                  className="lg:w-[295px] md:w-[295px] w-full"
                />
              ) : (
                <Card
                  key={bookmark._id}
                  className="lg:w-[295px] md:w-[295px] w-full lg:fixed md:fixed"
                >
                  <Card.Section>
                    <Image
                      src={bookmark.banner}
                      height={100}
                      alt="Banner img"
                    />
                  </Card.Section>
                  <Card.Section p={13}>
                    <div className="space-y-2">
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
                          Links:
                        </Text>
                        <Text>
                          {bookmark.links?.length}{" "}
                          {bookmark.links?.length! > 1 ? "links" : "link"}
                        </Text>
                      </Flex>
                      <Flex className="py-2 pr-2" gap={8} wrap="wrap">
                        {bookmark.labels?.length === 0 ? (
                          <Text fz="sm" fs="italic">
                            No bookmark labels
                          </Text>
                        ) : (
                          bookmark.labels?.map((label, index) => (
                            <Badge
                              key={index}
                              style={{ background: label.color }}
                              variant="filled"
                              className="normal-case"
                            >
                              {label.label}
                            </Badge>
                          ))
                        )}
                      </Flex>
                    </div>
                  </Card.Section>
                </Card>
              )}
            </Paper>
          ))}
        </Grid.Col>
        <Grid.Col lg={8} md={8} sm={7} className="w-full pb-5 lg:pb-0 md:pb-0">
          <Flex
            justify="space-between"
            className="sticky lg:top-[156px] md:top-[150px] top-[105px] pb-4 bg-white z-[1]"
          >
            {status === "pending" ? (
              <Skeleton
                visible={true}
                height={36}
                className="lg:w-[240px] md:w-[240px] w-full"
              />
            ) : (
              <Input
                icon={<CiSearch />}
                size="sm"
                className="lg:w-[240px] md:w-[240px] w-full"
                placeholder="Search your link..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                spellCheck="false"
              />
            )}
            <div>
              <Skeleton visible={status === "pending" && true}>
                <Button
                  onClick={open}
                  color="blue"
                  size="sm"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                  className="lg:flex md:flex hidden"
                >
                  Add links
                </Button>
              </Skeleton>
              <Skeleton visible={status === "pending" && true}>
                <ActionIcon
                  onClick={open}
                  className="lg:hidden md:hidden flex ml-2"
                  variant="filled"
                  color={"teal"}
                  size={36}
                >
                  <AiOutlinePlus size={20} />
                </ActionIcon>
              </Skeleton>
            </div>
          </Flex>
          <ScrollArea
            className="lg:h-[calc(100vh-246px)] md:h-[calc(100vh-246px)] h-auto "
            type="scroll"
            scrollbarSize={10}
            w="100%"
          >
            <Flex
              className="w-full"
              rowGap={12}
              wrap="wrap"
              justify="space-between"
              gap={5}
            >
              {links?.length === 0
                ? status !== "pending" && (
                    <Text c="dimmed" size="sm" fs="italic">
                      no result found
                    </Text>
                  )
                : orderedLinks?.map((link, i) => (
                    <Skeleton
                      key={link._id}
                      visible={status === "pending" && true}
                      className="lg:w-[298px] md:w-[298px] w-full"
                    >
                      <Paper
                        component="div"
                        className="lg:w-[298px] md:w-[298px] cursor-pointer  hover:shadow-lg transition-all relative z-[-100]"
                      >
                        <Card
                          component="a"
                          href={link.link!}
                          variant="outline"
                          target="_blank"
                          px={10}
                          py={6}
                          withBorder
                          radius={10}
                        >
                          <Flex justify="space-between" align="center" py={5}>
                            <Text
                              className="lg:text-[12.3px] text-sm text-gray-800"
                              fw={600}
                            >
                              <Highlight
                                highlightColor="cyan"
                                highlight={query}
                              >
                                {link.name!}
                              </Highlight>
                            </Text>
                          </Flex>
                          <Flex
                            className="text-gray-400 w-[290px] lg:w-full md:w-full"
                            align="center"
                            gap={5}
                          >
                            <RxLink2 size={14} />
                            <Text c="dimmed" fz="xs" className="truncate">
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
                        <Flex
                          align="center"
                          gap={2}
                          className="absolute right-0 p-2 top-0 w-max"
                        >
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => onDelete(link._id!, i)}
                            loading={
                              isLoading && i === index && deleting && !editLink
                            }
                            disabled={editLink && true}
                          >
                            <BiTrash />
                          </ActionIcon>

                          <ActionIcon
                            onClick={() => onEditClick(link._id!)}
                            color="gray"
                            variant="transparent"
                          >
                            <BiEdit />
                          </ActionIcon>
                        </Flex>
                      </Paper>
                    </Skeleton>
                  ))}
            </Flex>
          </ScrollArea>
        </Grid.Col>
        <AddLinksModal opened={opened} close={close} />
        <EditGroupModal
          bookmark={bookmark}
          opened={editGroup}
          close={editGroupHandlers.close}
        />
        <DropGroupModal opened={dropGroup} close={dropGroupHandlers.close} />
        <EditLinkModal
          opened={editLink}
          close={editLinkHandlers.close}
          toEdit={toEdit}
          bookmark={bookmark}
          links={links!}
        />
      </Grid>
    </>
  );
};

export default BookmarkView;
