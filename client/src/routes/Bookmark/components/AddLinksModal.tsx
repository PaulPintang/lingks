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
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";

const AddLinksModal = ({ opened, close }: ModalPropsInterface) => {
  const [image, setImage] = useState<string | null>(
    "https://ckl-website-static.s3.amazonaws.com/wp-content/uploads/2017/07/Banner_css-300x300.png.webp"
  );
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(true);
  const [showAdded, setShowAdded] = useState<boolean>(false);

  return (
    <Modal opened={opened} onClose={close} title="Add link" size="sm">
      <>
        {!add && (
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
                <Text c="dimmed" fz="xs" className="truncate w-full">
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
              onClick={() => setAdd(!add)}
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
        <Button size="xs" mt={10}>
          Confirm
        </Button>
      </>
    </Modal>
  );
};

export default AddLinksModal;
