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
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  dropBookmark,
  getBookmarks,
} from "../../../features/bookmarks/bookmarkSlice";
import { useNavigate, useParams } from "react-router-dom";

const DropGroupModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status } = useSelector((state: RootState) => state.bookmark);
  const { id } = useParams();

  const onDrop = () => {
    dispatch(dropBookmark(id!)).then(() => {
      dispatch(getBookmarks(localStorage.getItem("token")!)).then(() =>
        navigate("/bookmarks")
      );
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="xs"
      centered
      withCloseButton={false}
    >
      <div className="space-y-2">
        {id}
        <Title order={5}>Drop bookmark</Title>
        <Text c="dimmed" fz="sm">
          Are you sure you want to drop this bookmark? This action cannot be
          undone.
        </Text>
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button onClick={onDrop} color="red" fullWidth>
            {status === "pending" ? "Dropping..." : "Drop"}
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default DropGroupModal;
