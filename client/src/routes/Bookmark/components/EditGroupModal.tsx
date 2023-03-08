import React, { useState } from "react";
import { Image, TextInput, Textarea, Button, Flex, Modal } from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useParams } from "react-router-dom";
import {
  BookmarkInterface,
  getBookmarks,
  updateBookmark,
} from "../../../features/bookmarks/bookmarkSlice";

const EditGroupModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { status, bookmarks } = useSelector(
    (state: RootState) => state.bookmark
  );
  const bookmark = bookmarks.filter((bm) => bm._id === id);

  const [banner, setBanner] = useState<string | null>(
    "https://images.unsplash.com/photo-1531256379416-9f000e90aacc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  );
  const [title, setTitle] = useState<string>(bookmark[0]?.title!);
  const [description, setDescription] = useState<string>(
    bookmark[0]?.description!
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookmark = {
      id,
      title,
      description,
      banner,
    };
    // ! need to refactor, remove the fetch and update only the state bookmark
    dispatch(updateBookmark(bookmark)).then(() =>
      dispatch(getBookmarks(localStorage.getItem("token")!)).then(() => close())
    );
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit bookmark" size="sm">
      <form onSubmit={onSubmit} className="space-y-2">
        <Image src={banner} height={100} />
        <TextInput
          placeholder="Paste link here"
          label="Banner (Image link)"
          className="space-y-1"
          icon={<RxLink2 size="1rem" />}
          onChange={(e) => setBanner(e.target.value)}
        />
        <TextInput
          placeholder="Bookmark name"
          label="Bookmark name"
          className="space-y-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button type="submit" fullWidth>
            {status === "pending" ? "Updating" : "Confirm"}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditGroupModal;
