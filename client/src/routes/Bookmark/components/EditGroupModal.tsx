import React, { useState } from "react";
import { Image, TextInput, Textarea, Button, Flex, Modal } from "@mantine/core";
import { ModalPropsInterface } from "./Bookmarks";
import { RxLink2 } from "react-icons/rx";

const EditGroupModal = ({ opened, close }: ModalPropsInterface) => {
  const [image, setImage] = useState<string | null>(
    "https://images.unsplash.com/photo-1531256379416-9f000e90aacc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  );
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  return (
    <Modal opened={opened} onClose={close} title="Edit bookmark" size="sm">
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
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button fullWidth>Confirm</Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default EditGroupModal;
