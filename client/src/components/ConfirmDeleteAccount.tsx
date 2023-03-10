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

interface Props extends ModalPropsInterface {
  closePopover: () => void;
}

const ConfirmDeleteAccount = ({ opened, close, closePopover }: Props) => {
  const [type, setType] = useState("");
  const onDelete = () => {};

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        setType("");
      }}
      size="xs"
      centered
      withCloseButton={false}
    >
      <div className="space-y-2">
        <Title order={4}>Delete account</Title>
        <Text c="dimmed" fz="sm">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Text>
        <Text fz="sm" fw={700}>
          Type "delete" to confirm your action
        </Text>
        <TextInput
          size="sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
          autoFocus
        />
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            color="red"
            fullWidth
            disabled={type !== "delete" && true}
          >
            Delete account
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteAccount;
