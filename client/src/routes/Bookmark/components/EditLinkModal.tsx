import React, { useState } from "react";
import {
  Image,
  TextInput,
  Textarea,
  Button,
  Flex,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { ModalPropsInterface } from "./Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";

const EditLinkModal = ({ opened, close }: ModalPropsInterface) => {
  const [title, setTitle] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  return (
    <Modal opened={opened} onClose={close} title="Edit link" size="sm">
      <ActionIcon
        color="red"
        variant="subtle"
        className="absolute top-5 right-12"
      >
        <BiTrash />
      </ActionIcon>
      <div className="space-y-2">
        <TextInput
          placeholder="Bookmark name"
          label="Bookmark name"
          className="space-y-1"
          value={title!}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          placeholder="Bookmark link"
          label="Bookmark link"
          icon={<RxLink2 size="1rem" />}
          value={link!}
          onChange={(e) => setLink(e.target.value)}
        />
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button fullWidth>Confirm</Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default EditLinkModal;
