import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
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
  ActionIcon,
  MultiSelect,
  ColorPicker,
  Paper,
} from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  addBookmark,
  getBookmarks,
} from "../../../features/bookmarks/bookmarkSlice";
import { LinksInterface } from "../../../interfaces/bookmark.interface";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineCheck,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ToasterNotification from "../../../components/ToasterNotification";

interface colorInterface {
  label: string;
  color: string;
}

const BookmarkModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.bookmark);

  // bookmark
  const [banner, setBanner] = useState<string | null>(
    "https://images.unsplash.com/photo-1501290836517-b22a21c522a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
  );
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [links, setLinks] = useState<LinksInterface[]>([]);
  const [labels, setLabels] = useState<colorInterface[]>([]);

  // links
  const [linkName, setLinkName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  // state booleans
  const [saved, setSaved] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [showAdded, setShowAdded] = useState<boolean>(false);
  const [create, setCreate] = useState(false);

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

  useEffect(() => {
    if (labels?.length === 0) {
      setCreate(true);
    }
  }, [labels]);

  const onClose = () => {
    setTitle(null);
    setDescription("");
    setLabels([]);
    setLinks([]);
    setAdd(false);
    setSaved(false);
    close();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookmark = {
      title,
      description,
      banner,
      labels,
      links,
    };

    dispatch(addBookmark(bookmark))
      .unwrap()
      .then(() => {
        navigate("/bookmarks");
        const message = "New bookmark added successfully!";
        ToasterNotification(message);
        onClose();
      });
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

  const colors = [
    "#fa5252",
    "#e64980",
    "#be4bdb",
    "#7950f2",
    "#4c6ef5",
    "#228be6",
    "#15aabf",
    "#12b886",
    "#40c057",
    "#fab005",
  ];

  const onChange = (current: string[]) => {
    if (!create) {
      console.log("on change run");
      const updated = labels.filter((item) => {
        return current.includes(item.label);
      });
      setLabels([...updated]);
    }
    setCreate(false);
  };

  const onCreate = (query: string) => {
    console.log("on create run");
    setLabels((prev) => [
      ...prev,
      {
        label: query,
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    ]);
    return query;
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add bookmark" size="sm">
      <form onSubmit={onSubmit}>
        {saved ? (
          <>
            <Card radius="md" className="w-full">
              <Card.Section>
                <Image src={banner} height={100} alt="Banner img" />
              </Card.Section>
              <Card.Section p={13}>
                <div>
                  <Text weight={600}>{title}</Text>
                  <Text c="dimmed" fz="sm">
                    {description}
                  </Text>
                  <Flex className="py-2" gap={8} wrap="wrap">
                    {labels?.map((label, index) => (
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
                  <Flex justify="space-between">
                    <Flex gap={10} align="center" className="text-sm">
                      <Text c="dimmed" fw={600}>
                        Links:
                      </Text>
                      <Text>{links.length}</Text>
                    </Flex>
                    {!add && links.length === 0 && (
                      <ActionIcon
                        onClick={() => setAdd(true)}
                        variant="gradient"
                        color="gray"
                      >
                        <AiOutlinePlus />
                      </ActionIcon>
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
                      placeholder="Name"
                      label="Name"
                      className="space-y-1"
                      value={linkName!}
                      onChange={(e) => setLinkName(e.target.value)}
                      spellCheck="false"
                    />
                    <TextInput
                      placeholder="Paste link here"
                      label="Link"
                      className="space-y-1"
                      icon={<RxLink2 size="1rem" />}
                      value={link!}
                      onChange={(e) => setLink(e.target.value)}
                      spellCheck="false"
                    />
                    <Flex justify="flex-end" pt={15}>
                      <Button
                        onClick={handleAddLinks}
                        className="bg-green-500 hover:bg-green-600 transition-all"
                        disabled={linkName === null && link === null && true}
                      >
                        Add
                      </Button>
                    </Flex>
                  </>
                )}
              </Card.Section>
            </Card>
            <Flex gap={10} pt={20}>
              <Button
                onClick={() => setSaved(false)}
                variant="light"
                color="gray"
                fullWidth
              >
                Return
              </Button>
              <Button
                type="submit"
                onClick={() => setSaved(true)}
                fullWidth
                loading={isLoading}
              >
                Save
              </Button>
            </Flex>
          </>
        ) : (
          <div className="space-y-2">
            <Image src={banner} height={100} alt="Banner img" />
            <TextInput
              icon={<RxLink2 size="1rem" />}
              placeholder="Paste link here"
              label="Banner (Image link)"
              className="space-y-1"
              onChange={(e) => setBanner(e.target.value)}
              spellCheck="false"
            />
            <TextInput
              placeholder="Bookmark name"
              label="Bookmark name"
              className="space-y-1"
              value={title!}
              onChange={(e) => setTitle(e.target.value)}
              spellCheck="false"
            />
            <MultiSelect
              label="Labels"
              data={labels?.map((label) => label.label)}
              placeholder="Add 4 labels or less"
              searchable
              creatable
              maxSelectedValues={4}
              onChange={(values) => onChange(values)}
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => onCreate(query)}
              onMouseLeave={() => setCreate(true)}
              onKeyDown={() => setCreate(true)}
              onKeyPress={() => setCreate(true)}
              onKeyUp={() => setCreate(true)}
            />
            {/* <Flex align="center" justify="space-between">
              <Text size="xs" pt={4} c="dimmed">
                Select 3 label colors:
              </Text>

              <ColorPicker
                withPicker={false}
                swatchesPerRow={10}
                format="hex"
                value={select}
                onChange={setSelect}
                swatches={colors}
              />
            </Flex> */}
            {/* <Flex gap={7}>
              {labelss.map((label, index) => (
                <Badge
                  key={index}
                  style={{ background: label.color }}
                  variant="filled"
                  className="normal-case"
                >
                  {label.label}
                </Badge>
              ))}
            </Flex> */}
            <Textarea
              placeholder="Description"
              label="Description"
              value={description!}
              onChange={(e) => setDescription(e.target.value)}
              spellCheck="false"
            />
            <Flex gap={10} pt={10}>
              <Button onClick={onClose} variant="light" color="gray" fullWidth>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => setSaved(true)}
                fullWidth
                disabled={
                  title?.length === 0 || (description?.length === 0 && true)
                }
              >
                Continue
              </Button>
            </Flex>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default BookmarkModal;
