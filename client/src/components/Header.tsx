import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  ActionIcon,
  Popover,
  Avatar,
  Container,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import userimg from "../assets/user.png";
import AddBookmarkModal from "../routes/Bookmark/components/AddBookmarkModal";
import { useDisclosure } from "@mantine/hooks";
import { MdLogout } from "react-icons/md";
import Logo from "./Logo";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";
import { logout, resetAuthState } from "../features/auth/authSlice";
import { userProfile } from "../features/profile/profileSlice";
import ProfilePopover from "./ProfilePopover";
import { getBookmarks } from "../features/bookmarks/bookmarkSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const { bookmarks } = useAppSelector((state) => state.bookmark);
  const [opened, { open, close }] = useDisclosure(false);
  const [popover, popoverHandlers] = useDisclosure(false);
  const [deleteMe, deleteHandlers] = useDisclosure(false);
  const [status, setStatus] = useState(false);

  const onLogout = () => {
    setStatus(true);
    setTimeout(() => {
      dispatch(resetAuthState());
      dispatch(logout()).then(() => navigate("/"));
    }, 1000);
  };

  useEffect(() => {
    user && dispatch(getBookmarks());
    user && dispatch(userProfile());
  }, []);

  return (
    <main className="sticky top-0 z-10 bg-white">
      <Container className="lg:h-[100px] md:h-[100px] h-16">
        <Flex justify="space-between" align="center" className="h-full">
          <Logo />
          {user ? (
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
              <Popover position="bottom-end">
                <Popover.Target>
                  <ActionIcon radius="xl" size={40} variant="transparent">
                    <Avatar
                      radius={100}
                      src={profile?.image! || userimg}
                      alt=""
                    />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <ProfilePopover deletePrompt={deleteHandlers.open} />
                </Popover.Dropdown>
              </Popover>
            </Flex>
          ) : (
            <Flex justify="space-between" align="center" gap={12}>
              <Link to="/login">
                <Button variant="white" color="gray">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  Sign up
                </Button>
              </Link>
            </Flex>
          )}

          <AddBookmarkModal opened={opened} close={close} />
          <ConfirmDeleteAccount
            opened={deleteMe}
            close={deleteHandlers.close}
            closePopover={popoverHandlers.close}
          />
        </Flex>
      </Container>
    </main>
  );
};

export default Header;
