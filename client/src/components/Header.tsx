import React, { useState } from "react";
import { Flex, Center, Title, Button } from "@mantine/core";
import { GiBookmarklet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import profile from "../assets/user.png";
import AddBookmarkModal from "../pages/Home/components/AddBookmarkModal";
import { useDisclosure } from "@mantine/hooks";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex justify="space-between" align="center" className="h-[100px]">
      <Flex align="center" gap={10}>
        <GiBookmarklet size={25} className="text-purple-500" />
        <Title className="text-[26px]">
          <Link to="/" className="text-inherit no-underline">
            <span className="">linkd.io</span>
          </Link>
        </Title>
      </Flex>
      <Flex justify="space-between" align="center" gap={15}>
        <Button size="xs" onClick={open}>
          Add bookmark
        </Button>
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
