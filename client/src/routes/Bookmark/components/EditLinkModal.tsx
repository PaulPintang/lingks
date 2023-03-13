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
import {
  Bookmark,
  updateBookmark,
} from "../../../features/bookmarks/bookmarkSlice";
// import { addLink } from "../../../features/bookmarks/bookmarkSlice";

interface Props extends ModalPropsInterface {
  index: number;
  bookmark: Bookmark[];
}

const EditLinkModal = ({ opened, close, index, bookmark }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { isLoading } = useSelector((state: RootState) => state.bookmark);
  const toEdit = bookmark[0].links?.filter((_, i) => i === index);

  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const onClose = () => {
    setName("");
    setLink("");
    close();
  };

  const onDelete = () => {
    const links = [...bookmark[0]?.links!];
    links?.splice(index, 1);
    const updated = {
      id,
      links,
    };

    dispatch(updateBookmark(updated))
      .unwrap()
      .then(() => onClose());
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Edit link" size="sm">
      <form onSubmit={onSubmit}>
        <ActionIcon
          color="red"
          variant="subtle"
          className="absolute top-5 right-12"
          onClick={onDelete}
          loading={isLoading}
        >
          <BiTrash />
        </ActionIcon>
        <div className="space-y-2">
          <TextInput
            placeholder="Name"
            label="Name"
            className="space-y-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            placeholder="Link"
            label="Link"
            icon={<RxLink2 size="1rem" />}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Flex gap={10} pt={10}>
            <Button onClick={close} variant="light" color="gray" fullWidth>
              Cancel
            </Button>
            <Button fullWidth loading={isLoading}>
              {isLoading ? "Updating" : "Confirm"}
            </Button>
          </Flex>
        </div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;
