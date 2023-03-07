import React, { useState } from "react";
import {
  Image,
  TextInput,
  Textarea,
  Button,
  Flex,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { ModalPropsInterface } from "./Bookmarks";
import { RxLink2 } from "react-icons/rx";

const DropGroupModal = ({ opened, close }: ModalPropsInterface) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      size="xs"
      centered
      withCloseButton={false}
    >
      <div className="space-y-2">
        <Title order={5}>Drop bookmark</Title>
        <Text c="dimmed" fz="sm">
          Are you sure you want to drop this bookmark? This action cannot be
          undone.
        </Text>
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button color="red" fullWidth>
            Drop
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default DropGroupModal;
