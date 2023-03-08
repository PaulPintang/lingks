import React, { useState, useEffect } from "react";
import {
  Modal,
  Grid,
  Text,
  Image,
  Card,
  Flex,
  Badge,
  TextInput,
  Textarea,
  Button,
  MultiSelect,
} from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { addBookmark } from "../../../features/bookmarks/bookmarkSlice";
import { LinksInterface } from "../../../features/bookmarks/bookmarkSlice";
import { AiFillCloseCircle } from "react-icons/ai";
const BookmarkModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.bookmark);

  // bookmark
  const [banner, setBanner] = useState<string | null>(
    "https://images.unsplash.com/photo-1531256379416-9f000e90aacc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  );
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [links, setLinks] = useState<LinksInterface[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  // links
  const [linkName, setLinkName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  // state booleans
  const [saved, setSaved] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [showAdded, setShowAdded] = useState<boolean>(false);

  const today = new Date();
  const [added, setAdded] = useState<string>("");

  useEffect(() => {
    const format = {
      date: today.toDateString(),
      time: today.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setAdded(`${format.date}, ${format.time}`);
  }, [add]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookmark = {
      title,
      description,
      banner,
      labels,
      links,
    };

    console.log(bookmark.labels);
    dispatch(addBookmark(bookmark));

    setLabels([]);
  };

  const handleAddLinks = () => {
    setLinks([
      ...links,
      {
        name: linkName,
        link: link,
        date: added,
      },
    ]);
    setShowAdded(true);
    setAdd(false);
    setLink(null);
    setLinkName(null);
  };

  return (
    <Modal opened={opened} onClose={close} title="Add bookmark" size="sm">
      <form onSubmit={onSubmit}>
        {saved ? (
          <>
            <Card radius="md" className="w-full">
              <Card.Section>
                <Image src={banner} height={100} alt="Banner img" />
              </Card.Section>
              <Card.Section p={13}>
                <div>
                  <Flex justify="space-between" align="center">
                    <Text weight={600}>React Js</Text>
                    <Badge color="pink" variant="light">
                      Front-end
                    </Badge>
                  </Flex>
                  <Text c="dimmed" fz="sm">
                    My important links related to React
                  </Text>
                  <Flex justify="space-between">
                    <Flex gap={10} align="center" className="text-sm">
                      <Text c="dimmed" fw={600}>
                        Bookmarks:
                      </Text>
                      <Text>{links.length}</Text>
                    </Flex>
                    {!add && links.length === 0 && (
                      <Button onClick={() => setAdd(true)} size="xs">
                        + Add
                      </Button>
                    )}
                  </Flex>
                </div>

                {showAdded &&
                  links.map((link, index) => {
                    return (
                      <div className="relative" key={index}>
                        <Card
                          px={10}
                          py={6}
                          mt={10}
                          withBorder
                          radius={10}
                          className="cursor-pointer hover:bg-gray-50 transition-all"
                        >
                          <Text
                            className="text-[12.3px] text-gray-800"
                            fw={600}
                          >
                            {link.name}
                          </Text>
                          <Flex
                            className="text-gray-400"
                            align="center"
                            gap={5}
                          >
                            <RxLink2 size={14} />
                            <Text
                              c="dimmed"
                              fz="xs"
                              className="truncate w-full"
                            >
                              {link.link}
                            </Text>
                          </Flex>
                          <Flex gap={10} align="center" className="text-xs">
                            <Text c="dimmed" fw={600}>
                              Date Added:
                            </Text>
                            <Text className="bg-gray-100 text-gray-800 px-2 rounded-md">
                              {/* March 05, 2023, 5: 20 PM */}
                              {link.date}
                            </Text>
                          </Flex>
                        </Card>
                        <AiFillCloseCircle
                          onClick={() =>
                            setLinks((prev) =>
                              prev.filter((link, i) => i !== index)
                            )
                          }
                          className="absolute right-[-5px] top-[-4px] text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
                        />
                      </div>
                    );
                  })}
                {showAdded && links.length !== 0 && (
                  <Button
                    onClick={() => setAdd(true)}
                    variant="white"
                    size="xs"
                    pt={8}
                  >
                    + Add more
                  </Button>
                )}

                {add && (
                  <>
                    <TextInput
                      placeholder="Bookmark"
                      label="Bookmark Name"
                      className="space-y-1"
                      value={linkName!}
                      onChange={(e) => setLinkName(e.target.value)}
                    />
                    <TextInput
                      placeholder="Paste link here"
                      label="Bookmark link"
                      className="space-y-1"
                      icon={<RxLink2 size="1rem" />}
                      value={link!}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <Flex justify="flex-end" pt={10}>
                      <Button
                        onClick={handleAddLinks}
                        size="xs"
                        className="bg-green-400 hover:bg-green-500"
                      >
                        Add link
                      </Button>
                    </Flex>
                  </>
                )}
              </Card.Section>
            </Card>
            <Flex gap={10} pt={30}>
              <Button
                onClick={() => setSaved(false)}
                variant="light"
                color="gray"
                fullWidth
              >
                Return
              </Button>
              <Button type="submit" onClick={() => setSaved(true)} fullWidth>
                {status === "pending" ? "loading" : "Save"}
              </Button>
            </Flex>
          </>
        ) : (
          <div className="space-y-2">
            <Image src={banner} height={100} alt="Banner img" />
            <TextInput
              placeholder="Paste link here"
              label="Banner (Image link)"
              className="space-y-1"
              onChange={(e) => setBanner(e.target.value)}
            />
            <TextInput
              placeholder="Bookmark name"
              label="Bookmark name"
              className="space-y-1"
              value={title!}
              onChange={(e) => setTitle(e.target.value)}
            />
            <MultiSelect
              label="Labels"
              data={labels}
              placeholder="Add 3 labels or less"
              searchable
              creatable
              maxSelectedValues={3}
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = query;
                setLabels((prev) => [...prev, item]);
                return item;
              }}
            />
            <Textarea
              placeholder="Description"
              label="Description"
              value={description!}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Flex gap={10} pt={10}>
              <Button variant="light" color="gray" fullWidth>
                Cancel
              </Button>
              <Button type="button" onClick={() => setSaved(true)} fullWidth>
                Confirm
              </Button>
            </Flex>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default BookmarkModal;
