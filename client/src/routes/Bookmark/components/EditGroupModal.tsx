import React, { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  Textarea,
  Button,
  Flex,
  Modal,
  Text,
  MultiSelect,
  ColorPicker,
} from "@mantine/core";
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

interface colorInterface {
  label: string;
  color: string;
}

const EditGroupModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { status, bookmarks } = useSelector(
    (state: RootState) => state.bookmark
  );
  const bookmark = bookmarks.filter((bm) => bm._id === id);

  const [banner, setBanner] = useState<string | null>(bookmark[0]?.banner);
  const [title, setTitle] = useState<string>(bookmark[0]?.title!);
  const [description, setDescription] = useState<string>(
    bookmark[0]?.description!
  );
  const [labels, setLabels] = useState<colorInterface[]>(bookmark[0].labels);
  const [create, setCreate] = useState(true);

  const onClose = () => {
    // setLabels([]);
    setCreate(false);
    close();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookmark = {
      id,
      title,
      description,
      banner,
      labels,
    };
    dispatch(updateBookmark(bookmark)).then(() =>
      dispatch(getBookmarks(localStorage.getItem("token")!)).then(() =>
        onClose()
      )
    );
  };

  const colors = [
    "#fa5252",
    "#e64980",
    "#be4bdb",
    "#7950f2",
    "#4c6ef5",
    "#228be6",
    "#15aabf",
    "#12b886",
    "#40c057",
    "#fab005",
  ];

  const onChange = (current: string[]) => {
    console.log("on change run");
    const updated = labels.filter((item) => {
      return current.includes(item.label);
    });
    setLabels([...updated]);
  };

  const onCreate = (query: string) => {
    console.log("on create run");
    setLabels((prev) => [
      ...prev,
      {
        label: query,
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    ]);
    return query;
  };

  console.log("STATE", labels);
  return (
    <Modal opened={opened} onClose={onClose} title="Edit bookmark" size="sm">
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
        <MultiSelect
          label="Labels"
          data={labels.map((label) => label.label)}
          placeholder="Add 3 labels or less"
          searchable
          creatable
          maxSelectedValues={3}
          defaultValue={labels.map((label) => label.label)}
          onChange={(values) => onChange(values)}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => onCreate(query)}
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
