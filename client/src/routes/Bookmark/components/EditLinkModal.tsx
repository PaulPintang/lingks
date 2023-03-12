import React, { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  Textarea,
  Button,
  Flex,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useParams } from "react-router-dom";
// import { addLink } from "../../../features/bookmarks/bookmarkSlice";

interface Props extends ModalPropsInterface {
  index: number;
}

const EditLinkModal = ({ opened, close, index }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { status, bookmarks, bookmark } = useSelector(
    (state: RootState) => state.bookmark
  );
  // const bookmark = bookmarks.filter((bm) => bm._id === id);
  const links = bookmark[0]?.links?.filter((link, i) => i === index);
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const onClose = () => {
    setName("");
    setLink("");
    close();
  };

  const onSubmit = () => {};

  return (
    <Modal opened={opened} onClose={onClose} title="Edit link" size="sm">
      {index}
      <form onSubmit={onSubmit}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            placeholder="Bookmark link"
            label="Bookmark link"
            icon={<RxLink2 size="1rem" />}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Flex gap={10} pt={10}>
            <Button onClick={close} variant="light" color="gray" fullWidth>
              Cancel
            </Button>
            <Button fullWidth>
              {status === "pending" ? "Updating" : "Confirm"}
            </Button>
          </Flex>
        </div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;
