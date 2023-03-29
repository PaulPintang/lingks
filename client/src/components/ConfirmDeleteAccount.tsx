import React, { useState } from "react";
import { TextInput, Button, Flex, Modal, Text, Title } from "@mantine/core";
import { ModalPropsInterface } from "../routes/Bookmark/Bookmarks";
<<<<<<< HEAD
=======
import { AppDispatch, RootState } from "../app/store";
>>>>>>> d2c6102773b0d7b0e27e817db129cd69d73edc05
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../features/profile/profileSlice";
import { logout, resetAuthState } from "../features/auth/authSlice";
import { resetBookmarkState } from "../features/bookmarks/bookmarkSlice";
import { resetProfileState } from "../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
interface Props extends ModalPropsInterface {
  closePopover: () => void;
}

<<<<<<< HEAD
const ConfirmDeleteAccount = ({ opened, close, closePopover }: Props) => {
=======
const ConfirmDeleteAccount = ({ opened, close }: Props) => {
>>>>>>> d2c6102773b0d7b0e27e817db129cd69d73edc05
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [typeDelete, setType] = useState("");
  const { isLoading } = useAppSelector((state) => state.profile);

  const onDelete = () => {
    dispatch(deleteProfile())
      .unwrap()
      .then(() => {
        dispatch(logout()).then(() => {
          dispatch(resetBookmarkState());
          dispatch(resetProfileState());
          dispatch(resetAuthState());
          navigate("/");
        });
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        setType("");
      }}
      size="xs"
      centered
      withCloseButton={false}
    >
      <div className="space-y-2">
        <Title order={4}>Delete account</Title>
        <Text c="dimmed" fz="sm">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Text>
        <Text fz="sm" fw={700}>
          Type "delete" to confirm your action
        </Text>
        <TextInput
          size="sm"
          value={typeDelete}
          onChange={(e) => setType(e.target.value)}
          autoFocus
        />
        <Flex gap={10} pt={10}>
          <Button onClick={close} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            color="red"
            fullWidth
            disabled={typeDelete !== "delete" && true}
            loading={isLoading}
          >
            Delete account
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteAccount;
