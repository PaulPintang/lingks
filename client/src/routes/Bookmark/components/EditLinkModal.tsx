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
  toEdit: LinksInterface;
}

const EditLinkModal = ({ opened, close, toEdit, index, links }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { isLoading } = useSelector((state: RootState) => state.bookmark);

  const [allLinks, setAllLinks] = useState<LinksInterface[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    setName(toEdit.name);
    setLink(toEdit.link);
    setAllLinks(links);
  }, [opened]);

  const onClose = () => {
    setUpdate(false);
    setName("");
    setLink("");
    close();
  };

  const onEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAllLinks(
      allLinks?.map((item, i) => {
        if (i === index) {
          const updated = {
            ...item,
            name: name,
            link: link,
          };
          return updated;
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
      links: allLinks,
    };

    dispatch(updateBookmark(updated))
      .unwrap()
      .then(() => {
        onClose();
        setUpdate(false);
        const message = "Link updated successfully!";
        ToasterNotification(message);
      });
  };

  useEffect(() => {
    update && dispatchEdit();

    return () => {
      setUpdate(false);
    };
  }, [allLinks]);

  return (
    <Modal opened={opened} onClose={onClose} title="Edit link" size="sm">
      <form onSubmit={onEdit}>
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
            <Button type="submit" fullWidth loading={isLoading}>
              {isLoading ? "Updating" : "Confirm"}
            </Button>
          </Flex>
        </div>
      </form>
    </Modal>
  );
};

export default EditLinkModal;
