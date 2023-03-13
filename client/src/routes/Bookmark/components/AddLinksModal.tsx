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
  Notification,
  Paper,
} from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import {
  getBookmarks,
  LinksInterface,
} from "../../../features/bookmarks/bookmarkSlice";
import { AiFillCloseCircle, AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useParams } from "react-router-dom";

import { updateBookmark } from "../../../features/bookmarks/bookmarkSlice";
import ToasterNotification from "../../../components/ToasterNotification";
const AddLinksModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, bookmark } = useSelector(
    (state: RootState) => state.bookmark
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  // const bookmark = bookmarks.filter((bm) => bm._id === id);

  const [links, setLinks] = useState<LinksInterface[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [add, setAdd] = useState<boolean>(true);
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

  const onClose = () => {
    setName(null);
    setLink(null);
    setLinks([]);
    setAdd(true);
    close();
  };

  const onAdd = () => {
    setLinks([
      ...links,
      {
        name: name,
        link: link,
        date: added,
      },
    ]);
    setShowAdded(true);
    setAdd(false);
    setName(null);
    setLink(null);
  };

  const onConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const addedLinks = {
      id,
      links: [...bookmark[0].links!, ...links],
    };

    dispatch(updateBookmark(addedLinks))
      .unwrap()
      .then(() => {
        onClose();
        const message = `${links.length} new ${
          links.length > 1 ? "links" : "link"
        } added to your list!`;
        ToasterNotification(message);
      });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add link" size="sm">
      <>
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
                </Card>
                <AiFillCloseCircle
                  onClick={() => {
                    setLinks((prev) => prev.filter((link, i) => i !== index));
                    links.length === 1 && setAdd(true);
                  }}
                  className="absolute right-[-5px] top-[-4px] text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
                />
              </div>
            );
          })}
        {showAdded && links.length !== 0 && (
          <Button onClick={() => setAdd(true)} variant="white" size="xs" pt={8}>
            + Add more
          </Button>
        )}

        {add && (
          <>
            <TextInput
              placeholder="Name"
              label="Name"
              className="space-y-1"
              value={name!}
              onChange={(e) => setName(e.target.value)}
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
            <Flex justify="flex-end" pt={10}>
              <Button
                onClick={onAdd}
                className="bg-green-500 hover:bg-green-600 transition-all mt-3"
                disabled={name === null && link === null && true}
              >
                Add link
              </Button>
            </Flex>
          </>
        )}

        {links.length !== 0 && showAdded && !add && (
          <Flex justify="flex-end">
            <Button
              onClick={onConfirm}
              mt={10}
              className="block mt-5"
              loading={isLoading}
            >
              Confirm
            </Button>
          </Flex>
        )}
      </>
    </Modal>
  );
};

export default AddLinksModal;
