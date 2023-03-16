import { Button, Flex, Modal, Text, Title } from "@mantine/core";
import { ModalPropsInterface } from "../Bookmarks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  dropBookmark,
  getBookmarks,
} from "../../../features/bookmarks/bookmarkSlice";
import { useNavigate, useParams } from "react-router-dom";
import { userProfile } from "../../../features/profile/profileSlice";

import ToasterNotification from "../../../components/ToasterNotification";

const DropGroupModal = ({ opened, close }: ModalPropsInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.bookmark);
  const { id } = useParams();

  const onDrop = () => {
    dispatch(dropBookmark(id!))
      .unwrap()
      .then(() => {
        // dispatch(getBookmarks());
        // dispatch(userProfile());
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
