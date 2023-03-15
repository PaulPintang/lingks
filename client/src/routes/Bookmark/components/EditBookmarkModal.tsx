import React, { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  Textarea,
  Button,
  Flex,
  Modal,
  MultiSelect,
  ActionIcon,
} from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useParams } from "react-router-dom";
import { updateBookmark } from "../../../features/bookmarks/bookmarkSlice";
import { BookmarkInterface } from "../../../interfaces/bookmark.interface";
import ToasterNotification from "../../../components/ToasterNotification";
import { LabelInterface } from "../../../interfaces/bookmark.interface";
import { defaultImage } from "./AddBookmarkModal";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props extends ModalPropsInterface {
  bookmark: BookmarkInterface[];
}

const EditGroupModal = ({ opened, close, bookmark }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { isLoading, bookmarks } = useSelector(
    (state: RootState) => state.bookmark
  );
  const [banner, setBanner] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [labels, setLabels] = useState<LabelInterface[]>([]);
  const [create, setCreate] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setBanner(bookmark[0]?.banner!);
    setTitle(bookmark[0]?.title!);
    setDescription(bookmark[0]?.description!);
    setLabels(bookmark[0]?.labels!);
  }, [opened]);

  useEffect(() => {
    if (labels?.length === 0) {
      setCreate(true);
    }
  }, [labels]);

  const onClose = () => {
    setBanner(bookmark[0]?.banner!);
    setCreate(false);
    setError(false);
    close();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (banner.includes("http") || banner.length === 0) {
      const bookmark = {
        id,
        title,
        description,
        banner: banner.includes("http") ? banner : defaultImage,
        labels,
      };
      dispatch(updateBookmark(bookmark))
        .unwrap()
        .then(() => {
          onClose();
          const message = "Bookmark updated successfully";
          ToasterNotification(message);
        });
    } else {
      setError(true);
    }
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
    if (!create) {
      console.log("on change run");
      const updated = labels.filter((item) => {
        return current.includes(item.label);
      });
      setLabels([...updated]);
    }
    setCreate(false);
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

  return (
    <Modal opened={opened} onClose={onClose} title="Edit bookmark" size="sm">
      <form onSubmit={onSubmit} className="space-y-2">
        <Image
          src={banner?.includes("http") ? banner : defaultImage}
          height={100}
        />
        <TextInput
          placeholder="Paste link here"
          label="Banner (Image link)"
          className="space-y-1"
          icon={<RxLink2 size="1rem" />}
          onChange={(e) => setBanner(e.target.value)}
          spellCheck="false"
          value={banner}
          error={error && "Please enter a valid link or URL"}
          rightSection={
            banner?.length > 5 && (
              <ActionIcon
                onClick={() => {
                  setBanner("");
                  setError(false);
                }}
              >
                <AiFillCloseCircle className="text-gray-400" />
              </ActionIcon>
            )
          }
        />
        <TextInput
          placeholder="Bookmark name"
          label="Bookmark name"
          className="space-y-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          spellCheck="false"
        />
        <MultiSelect
          label="Labels"
          data={labels?.map((label) => label.label)}
          placeholder="Add 4 labels or less"
          creatable
          searchable
          maxSelectedValues={4}
          defaultValue={labels?.map((label) => label.label)}
          onChange={(values) => onChange(values)}
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => onCreate(query)}
          onMouseLeave={() => setCreate(true)}
          onKeyDown={() => setCreate(true)}
          onKeyPress={() => setCreate(true)}
          onKeyUp={() => setCreate(true)}
        />

        <Textarea
          placeholder="Description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          spellCheck="false"
        />
        <Flex gap={10} pt={10}>
          <Button
            onClick={() => {
              setError(false);
              close();
            }}
            variant="light"
            color="gray"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="teal"
            fullWidth
            loading={isLoading}
            disabled={error}
          >
            Update
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditGroupModal;
