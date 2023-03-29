import { Button, Flex, Modal, Text, Title } from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { dropBookmark } from "../../../features/bookmarks/bookmarkSlice";
import { useNavigate, useParams } from "react-router-dom";

import ToasterNotification from "../../../components/ToasterNotification";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const DropGroupModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.bookmark);
  const { id } = useParams();

  const onDrop = () => {
    dispatch(dropBookmark(id!))
      .unwrap()
      .then(() => {
        navigate("/bookmarks");
        const message = " Bookmark successfully deleted!";
        ToasterNotification(message);
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="xs"
      centered
      withCloseButton={false}
      closeOnClickOutside={false}
    >
      <div className="space-y-2">
        <Title order={4}>Drop bookmark</Title>
        <Text c="dimmed" fz="sm">
          Are you sure you want to drop this bookmark? This action cannot be
          undone.
        </Text>
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button onClick={onDrop} color="red" fullWidth loading={isLoading}>
            Drop
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default DropGroupModal;
