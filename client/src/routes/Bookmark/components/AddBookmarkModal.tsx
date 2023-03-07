import React, { useState } from "react";
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
} from "@mantine/core";
import { ModalPropsInterface } from "./Bookmarks";
import { RxLink2 } from "react-icons/rx";

const BookmarkModal = ({ opened, close }: ModalPropsInterface) => {
  const [image, setImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1531256379416-9f000e90aacc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  );
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const [showAdded, setShowAdded] = useState<boolean>(false);

  return (
    <Modal opened={opened} onClose={close} title="Add bookmark" size="sm">
      {saved ? (
        <>
          <Card radius="md" className="w-full">
            <Card.Section>
              <Image src={image} height={100} alt="React" />
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
                    <Text>1</Text>
                  </Flex>
                  {!add && (
                    <Button onClick={() => setAdd(true)} size="xs">
                      + Add
                    </Button>
                  )}
                </Flex>
              </div>

              {showAdded && (
                <div>
                  <Card
                    px={10}
                    py={6}
                    mt={10}
                    withBorder
                    radius={10}
                    className="cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <Text className="text-[12.3px] text-gray-800" fw={600}>
                      React Important Hooks
                    </Text>
                    <Flex className="text-gray-400" align="center" gap={5}>
                      <RxLink2 size={14} />
                      <Text c="dimmed" fz="xs" className="truncate">
                        https://beta.reactjs.org/reference/react
                      </Text>
                    </Flex>
                    <Flex gap={10} align="center" className="text-xs">
                      <Text c="dimmed" fw={600}>
                        Date Added:
                      </Text>
                      <Text className="bg-gray-100 text-gray-800 px-2 rounded-md">
                        March 05, 2023, 5: 20 PM
                      </Text>
                    </Flex>
                  </Card>
                  <Button
                    onClick={() => setAdd(true)}
                    variant="white"
                    size="xs"
                    pt={8}
                  >
                    + Add more
                  </Button>
                </div>
              )}

              {add && (
                <>
                  <TextInput
                    placeholder="Bookmark"
                    label="Bookmark Name"
                    className="space-y-1"
                    value={title!}
                  />
                  <TextInput
                    placeholder="Paste link here"
                    label="Bookmark link"
                    className="space-y-1"
                    icon={<RxLink2 size="1rem" />}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <Flex justify="flex-end" pt={10}>
                    <Button
                      onClick={() => {
                        setShowAdded(true);
                        setAdd(false);
                      }}
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
            <Button onClick={() => setSaved(true)} fullWidth>
              Save
            </Button>
          </Flex>
        </>
      ) : (
        <div className="space-y-2">
          <Image src={image} height={100} />
          <TextInput
            placeholder="Paste link here"
            label="Banner (Image link)"
            className="space-y-1"
            icon={<RxLink2 size="1rem" />}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextInput
            placeholder="Bookmark group name"
            label="Bookmark Name"
            className="space-y-1"
            value={title!}
          />
          <Textarea
            placeholder="Description"
            label="Description"
            value={description!}
          />
          <Flex gap={10} pt={10}>
            <Button variant="light" color="gray" fullWidth>
              Cancel
            </Button>
            <Button onClick={() => setSaved(true)} fullWidth>
              Confirm
            </Button>
          </Flex>
        </div>
      )}
    </Modal>
  );
};

export default BookmarkModal;
