import { Flex, Card, Text, Image, Badge, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { singleBookmark } from "../../features/bookmarks/bookmarkSlice";
import AddBookmarkModal from "../Bookmark/components/AddBookmarkModal";
import { useDisclosure } from "@mantine/hooks";
import BookmarkEmptyState from "../../components/BookmarkEmptyState";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export interface ModalPropsInterface {
  opened: boolean;
  close: () => void;
}

const Bookmarks = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useAppDispatch();
  const { bookmarks, bookmark } = useAppSelector(
    (state) => state.bookmark
  );

  const orderedBookmarks = bookmarks
    .slice()
    .sort((a, b) => b.createdAt!.localeCompare(a.createdAt!));

  return (
    <>
      {bookmarks?.length !== 0 && (
        <div className="sticky lg:top-[100px] md:top-[100px] top-[60px] z-[1] bg-white pb-3">
          <Title order={1}>Bookmarks</Title>
        </div>
      )}
      <Flex gap={20} className="w-full" wrap="wrap">
        {bookmark.length === 0 && bookmarks?.length === 0 && (
          <BookmarkEmptyState open={open} />
        )}
        {bookmarks?.length !== 0 &&
          orderedBookmarks?.map((bookmark) => (
            <Card
              onClick={() =>
                dispatch(singleBookmark(bookmark._id!))
                  .unwrap()
                  .then(() => navigate(`/bookmark/${bookmark._id!}`))
              }
              key={bookmark._id}
              className="no-underline lg:w-[295px] md:w-[295px] w-full active:opacity-90 transition-all cursor-pointer hover:shadow-xl border-3"
              shadow="sm"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Image src={bookmark.banner} height={100} alt="React" />
              </Card.Section>
              <Card.Section p={15}>
                <div className="space-y-1">
                  <Text weight={600}>{bookmark.title}</Text>
                  <Text c="dimmed" fz="sm" className="line-clamp-2">
                    {bookmark.description}
                  </Text>
                  <Flex gap={10} align="center" className="text-sm">
                    <Text c="dimmed" fw={600}>
                      Links:
                    </Text>
                    <Text>
                      {bookmark.links?.length}{" "}
                      {bookmark.links?.length! >= 2 && "links"}
                    </Text>
                  </Flex>
                  <Flex className="py-2" gap={8} wrap="wrap">
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
          ))}
        <AddBookmarkModal opened={opened} close={close} />
      </Flex>
    </>
  );
};

export default Bookmarks;
