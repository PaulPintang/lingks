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
} from "@mantine/core";
import { UserInterface } from "../features/auth/authService";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import profile from "../assets/user.png";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";
import { useDisclosure } from "@mantine/hooks";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  deletePrompt: () => void;
  closePopover: () => void;
}

const ProfileView = ({ deletePrompt, closePopover }: Props) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  return (
    <section className="space-y-2">
      {opened ? (
        <div className="w-[210px]">
          <Flex align="center" gap={10} pb={18}>
            <BiArrowBack
              onClick={toggle}
              className="text-gray-500 hover:text-gray-500 cursor-pointer"
            />
            <Text size="xs">Edit Profile</Text>
          </Flex>
          <Center>
            <ActionIcon radius="lg" size={120} variant="transparent">
              {user?.image ? (
                <img src={user?.image} alt="" />
              ) : (
                <div className="rounded-full">
                  <img src={profile} alt="" />
                </div>
              )}
            </ActionIcon>
          </Center>
          <TextInput label="Name" value={name} size="xs" spellCheck="false" />
          <TextInput label="Email" value={email} size="xs" spellCheck="false" />
          <Flex justify="end" pt={15}>
            <Button size="xs" color="teal">
              Update
            </Button>
          </Flex>
        </div>
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
            <Button
              onClick={toggle}
              size="xs"
              color="gray"
              variant={opened ? "light" : "white"}
            >
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
      )}
    </section>
  );
};

export default ProfileView;
