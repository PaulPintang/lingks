import React, { useEffect, useState } from "react";
import { TextInput, Button, Flex, Modal, ActionIcon } from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { RxLink2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { updateBookmark } from "../../../features/bookmarks/bookmarkSlice";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  BookmarkInterface,
  LinksInterface,
} from "../../../interfaces/bookmark.interface";
import ToasterNotification from "../../../components/ToasterNotification";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface Props extends ModalPropsInterface {
  index: number;
  bookmark: BookmarkInterface[];
  links: LinksInterface[];
  toEdit: LinksInterface;
}

const EditLinkModal = ({ opened, close, toEdit, index, links }: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { isLoading } = useAppSelector((state) => state.bookmark);

  const [allLinks, setAllLinks] = useState<LinksInterface[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    setName(toEdit.name!);
    setLink(toEdit.link!);
    setAllLinks(links);
  }, [opened]);

  const onClose = () => {
    setUpdate(false);
    setName("");
    setLink("");
    setError(false);
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
    if (link.includes("http")) {
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
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    update && dispatchEdit();

    return () => {
      setUpdate(false);
    };
  }, [allLinks]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit link"
      size="sm"
      closeOnClickOutside={false}
    >
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
            onChange={(e) => {
              setLink(e.target.value);
              setError(false);
            }}
            error={error && "Please enter a valid link or URL"}
            rightSection={
              link?.length > 5 && (
                <ActionIcon
                  onClick={() => {
                    setLink("");
                    setError(false);
                  }}
                >
                  <AiFillCloseCircle className="text-gray-400" />
                </ActionIcon>
              )
            }
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
