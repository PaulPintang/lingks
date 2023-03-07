import React, { useState } from "react";
import { Flex, Center, Title, Button, ActionIcon } from "@mantine/core";
import { GiBookmarklet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import profile from "../assets/user.png";
import AddBookmarkModal from "../routes/Bookmark/components/AddBookmarkModal";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import Logo from "./Logo";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex justify="space-between" align="center" className="h-[100px]">
      <Logo />
      <Flex justify="space-between" align="center" gap={15}>
        <Button className="hidden lg:flex md:flex" size="xs" onClick={open}>
          Add bookmark
        </Button>
        <ActionIcon
          onClick={open}
          className="lg:hidden md:hidden"
          size="sm"
          color="blue"
          variant="filled"
        >
          <AiOutlinePlus size={17} />
        </ActionIcon>
        {user?.image ? (
          <img src={user?.image} alt="" />
        ) : (
          <div className="rounded-full w-9">
            <img src={profile} alt="" />
          </div>
        )}
      </Flex>
      <AddBookmarkModal opened={opened} close={close} />
    </Flex>
  );
};

export default Header;
