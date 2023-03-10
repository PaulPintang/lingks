import React, { useState } from "react";
import {
  Popover,
  Button,
  Text,
  Flex,
  ActionIcon,
  Collapse,
  TextInput,
  Center,
  Modal,
  Avatar as Picture,
} from "@mantine/core";
import { UserInterface } from "../features/auth/authService";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import profile from "../assets/user.png";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";
import { useDisclosure } from "@mantine/hooks";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineCake } from "react-icons/md";
import Avatar from "react-avatar-edit";
import ProfilePicture from "./ProfilePicture";

interface Props {
  deletePrompt: () => void;
  closePopover: () => void;
}

const ProfileView = ({ deletePrompt, closePopover }: Props) => {
  const [viewImg, setViewImg] = useState<string | null>(null);
  const [opened, { toggle }] = useDisclosure(false);
  const [picture, pictureHandlers] = useDisclosure(false);
  const { user } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const onCrop = (view: string) => {
    setViewImg(view);
  };

  const onClose = () => {
    setViewImg(null);
  };

  const onUpdate = () => {};
  return (
    <section className="space-y-2">
      {opened ? (
        <form className="w-[210px]" onSubmit={onUpdate}>
          <Flex align="center" gap={10} pb={18}>
            <BiArrowBack
              onClick={toggle}
              className="text-gray-500 hover:text-gray-500 cursor-pointer"
            />
            <Text size="xs">Edit Profile</Text>
          </Flex>
          <Center>
            <Picture
              radius={100}
              size={140}
              src={viewImg || user?.image || profile}
              onClick={pictureHandlers.open}
            />
          </Center>
          <TextInput label="Name" value={name} size="xs" spellCheck="false" />
          <TextInput label="Email" value={email} size="xs" spellCheck="false" />
          <Flex justify="end" pt={15}>
            <Button size="xs" color="teal">
              Update
            </Button>
          </Flex>
        </form>
      ) : (
        <>
          <Flex align="center" gap={13}>
            <ActionIcon radius="lg" size={40} variant="transparent">
              {user?.image ? (
                <img src={user?.image} alt="" />
              ) : (
                <div className="rounded-full">
                  <img src={profile} alt="" />
                </div>
              )}
            </ActionIcon>
            <div className="-space-y-1">
              <Text size="sm">{user?.name}</Text>
              <Text size="sm" c="dimmed" fz="xs">
                {user?.email}
              </Text>
            </div>
          </Flex>

          <Flex gap={10}>
            <Button onClick={toggle} size="xs" color="gray" variant="light">
              Edit profile
            </Button>
            <Button
              size="xs"
              color="red"
              variant="white"
              onClick={() => {
                deletePrompt();
                closePopover();
              }}
            >
              Delete account
            </Button>
          </Flex>
        </>
      )}

      {!opened && (
        <div>
          <Flex gap={10}>
            <Text c="dimmed" size="xs">
              Bookmarks:
              <span className="text-gray-700"> 2</span>
            </Text>
            <Text c="dimmed" size="xs">
              Links:
              <span className="text-gray-700"> 28</span>
            </Text>
          </Flex>
          <Flex align="center" gap={8}>
            <MdOutlineCake className="text-gray-500" />
            <Text c="dimmed" size="xs" pt={4}>
              Joined on March 1, 2023
            </Text>
          </Flex>
        </div>
      )}
      <Modal
        opened={picture}
        onClose={pictureHandlers.close}
        size="xs"
        centered
        withCloseButton={false}
      >
        <Avatar onClose={onClose} onCrop={onCrop} width="100%" height={295} />
      </Modal>
    </section>
  );
};

export default ProfileView;
