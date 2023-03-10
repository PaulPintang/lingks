import React from "react";
import { Popover, Button, Text } from "@mantine/core";
import { UserInterface } from "../features/auth/authService";

const ProfileView = (user: any) => {
  return (
    <div className="h-32 ">
      <Text size="sm">{user?.name}</Text>
    </div>
  );
};

export default ProfileView;
