import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Image,
  TextInput,
  Textarea,
  Button,
  Flex,
  Modal,
  ActionIcon,
  Paper,
  Text,
} from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useParams } from "react-router-dom";
import { updateBookmark } from "../../../features/bookmarks/bookmarkSlice";
// import { addLink } from "../../../features/bookmarks/bookmarkSlice";
import {
  BookmarkInterface,
  LinksInterface,
} from "../../../interfaces/bookmark.interface";
import { AiOutlineCheck } from "react-icons/ai";
import ToasterNotification from "../../../components/ToasterNotification";

interface Props extends ModalPropsInterface {
  index: number;
  bookmark: BookmarkInterface[];
  links: LinksInterface[];
}

const EditLinkModal = ({ opened, close, index, links }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { isLoading, bookmark } = useSelector(
    (state: RootState) => state.bookmark
  );

  const [all, setLinks] = useState(links);
  const [update, setUpdate] = useState<boolean>(false);

  const toEdit = all?.find((_, i) => i === index);

  const [name, setName] = useState<string | null>(toEdit?.name!);
  const [link, setLink] = useState<string | null>(toEdit?.link!);
  // const [deleting, setDeleting] = useState<boolean>(false);

  const onClose = () => {
    // setDeleting(false);
    setUpdate(false);
    setName("");
    setLink("");
    close();
  };

  // const onDelete = () => {
  //   links?.splice(index, 1);
  //   const updated = {
  //     id,
  //     links,
  //   };

  //   dispatch(updateBookmark(updated))
  //     .unwrap()
  //     .then(() => {
  //       onClose();
  //       const message = "Link deleted successfully!";
  //       ToasterNotification(message);
  //     });
  // };

  const onEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinks(
      all?.map((item, i) => {
        if (i === index) {
          const ugh = {
            name: name,
            link: link,
          };
          return ugh;
        } else {
          return item;
        }
      })
    );
    setUpdate(true);
  };

  const dispatchEdit = () => {
    const updated = {
      id,
      links: all,
    };

    dispatch(updateBookmark(updated))
      .unwrap()
      .then(() => {
        onClose();
        const message = "Link updated successfully!";
        ToasterNotification(message);
      });
  };

  useEffect(() => {
    update && dispatchEdit();

    return () => {
      onClose();
    };
  }, [all]);

  return (
    <Modal opened={opened} onClose={onClose} title="Edit link" size="sm">
      <form onSubmit={onEdit}>
        <ActionIcon
          color="red"
          variant="subtle"
          className="absolute top-5 right-12"
          // onClick={onDelete}
          loading={isLoading}
        >
          <BiTrash />
        </ActionIcon>
        <div className="space-y-2">
          <TextInput
            placeholder="Name"
            label="Name"
            className="space-y-1"
            value={name!}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            placeholder="Link"
            label="Link"
            icon={<RxLink2 size="1rem" />}
            value={link!}
            onChange={(e) => setLink(e.target.value)}
          />
          <Flex gap={10} pt={10}>
            <Button onClick={close} variant="light" color="gray" fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={update}>
              {update ? "Updating" : "Confirm"}
            </Button>
          </Flex>
        </div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;
