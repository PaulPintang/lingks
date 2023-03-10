import React from "react";
import { Popover, Button, Text } from "@mantine/core";
import { UserInterface } from "../features/auth/authService";

const ProfileView = (user: any) => {
  return <Text size="sm">{user?.name}</Text>;
};

export default ProfileView;
