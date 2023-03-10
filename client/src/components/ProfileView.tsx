import React from "react";
import { Popover, Button, Text, Flex, ActionIcon } from "@mantine/core";
import { UserInterface } from "../features/auth/authService";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import profile from "../assets/user.png";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";

const ProfileView = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <section className="space-y-2">
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
        <Button size="xs" color="gray" variant="light">
          Edit profile
        </Button>
        <Button size="xs" color="red" variant="white">
          Delete account
        </Button>
      </Flex>
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
      <ConfirmDeleteAccount />
    </section>
  );
};

export default ProfileView;
