import { useState, useEffect, useContext } from "react";
import Avatar from "react-avatar-edit";
import { Button, Modal } from "@mantine/core";
import { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";

import { ModalPropsInterface } from "../routes/Bookmark/Bookmarks";

interface Props extends ModalPropsInterface {
  setViewImg: () => string;
}
const ProfilePicture = ({ opened, close, setViewImg }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, user } = useSelector((state: RootState) => state.user);

  const onCrop = (view: string) => {
    setViewImg(view);
  };

  const onClose = () => {
    setViewImg(null);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => close}
      size="xs"
      centered
      withCloseButton={false}
    >
      <Avatar onClose={onClose} onCrop={onCrop} width="100%" height={295} />
    </Modal>
  );
};

export default ProfilePicture;
