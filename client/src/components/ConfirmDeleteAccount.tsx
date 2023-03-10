import React, { useRef, useState } from "react";
import {
  Image,
  TextInput,
  Button,
  Flex,
  Modal,
  Text,
  Title,
  PasswordInput,
} from "@mantine/core";
import { ModalPropsInterface } from "../routes/Bookmark/Bookmarks";
import { MdLockOutline } from "react-icons/md";

const ConfirmDeleteAccount = ({ opened, close }: ModalPropsInterface) => {
  const password = useRef<HTMLInputElement>(null);
  const onDelete = () => {
    console.log(password.current?.value);
  };

  return (
    <Modal
      opened={true}
      onClose={close}
      size="xs"
      centered
      withCloseButton={false}
    >
      <div className="space-y-2">
        <Title order={4}>Delete account</Title>
        <Text c="dimmed" fz="sm">
          To delete your account please confirm your password,
        </Text>
        <TextInput size="sm" placeholder="Password" ref={password} />
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button onClick={onDelete} color="red" fullWidth>
            Delete
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteAccount;
