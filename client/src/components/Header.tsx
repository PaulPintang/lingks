import React, { useState } from "react";
import {
  Flex,
  Center,
  Title,
  Button,
  ActionIcon,
  Popover,
} from "@mantine/core";
import { GiBookmarklet } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import profile from "../assets/user.png";
import AddBookmarkModal from "../routes/Bookmark/components/AddBookmarkModal";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import Logo from "./Logo";
import ProfileView from "./ProfileView";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { bookmarks } = useSelector((state: RootState) => state.bookmark);
  const [opened, { open, close }] = useDisclosure(false);
  const [show, handlers] = useDisclosure(false);
  const [status, setStatus] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("token");
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
      navigate("/");
    }, 3000);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      className="lg:h-[100px] md:h-[100px] h-16 sticky top-0 z-10 bg-white"
    >
      <Logo />
      <Flex justify="space-between" align="center" gap={12}>
        {bookmarks.length !== 0 && (
          <Button size="xs" onClick={open}>
            <span className="hidden lg:flex md:flex ">Add bookmark</span>
            <span className="flex lg:hidden md:hidden">Add</span>
          </Button>
        )}
        <ActionIcon onClick={onLogout} loading={status}>
          <MdLogout className="text-gray-400" />
        </ActionIcon>
        <Popover width={220} position="bottom-end" withArrow opened={show}>
          <Popover.Target>
            <ActionIcon
              onClick={handlers.toggle}
              radius="lg"
              size={35}
              variant="transparent"
            >
              {user?.image ? (
                <img src={user?.image} alt="" />
              ) : (
                <div className="rounded-full">
                  <img src={profile} alt="" />
                </div>
              )}
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <ProfileView user={user} />
          </Popover.Dropdown>
        </Popover>
      </Flex>
      <AddBookmarkModal opened={opened} close={close} />
    </Flex>
  );
};

export default Header;
