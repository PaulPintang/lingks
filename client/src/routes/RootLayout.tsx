import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Avatar from "react-avatar-edit";
import axios from "axios";
import {
  Container,
  Center,
  Button,
  Title,
  Stack,
  Avatar as AvatarMantine,
  Text,
  Modal,
  Alert,
  LoadingOverlay,
  Loader,
  Grid,
  Flex,
  Input,
  Card,
  Image,
  Group,
  Badge,
  ActionIcon,
  Notification,
} from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../assets/user.png";
import { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import userimg from "../assets/user.png";
import { BiSearchAlt } from "react-icons/bi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
// import Bookmarks from "./components/Bookmarks";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getBookmarks } from "../features/bookmarks/bookmarkSlice";
import { AiOutlineCheck } from "react-icons/ai";

const RootLayout = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [viewImg, setViewImg] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { status } = useSelector((state: RootState) => state.profile);
  const { fetching, isLoading } = useSelector(
    (state: RootState) => state.bookmark
  );

  // useEffect(() => {
  //   dispatch(profile());
  // }, []);

  return (
    <Container>
      <LoadingOverlay
        visible={status === "pending" && true}
        loader={<Loader variant="bars" />}
        overlayOpacity={1}
      />
      <Header />
      <Toaster />

      <main className="h-[calc(1 00vh-170px)] pb-5">
        <Outlet />
      </main>
      {/* {!isLoading && (
        <Notification
          icon={<AiOutlineCheck />}
          title="Bookmark added successfully"
          color="teal"
          className="absolute bottom-3 right-[210px]"
        >
          <Text fz="xs">1 new bookmark added to your list</Text>
        </Notification>
      )} */}
      {/* <Footer /> */}
    </Container>
  );
};

export default RootLayout;
