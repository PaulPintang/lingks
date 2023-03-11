import { useState, useEffect, useContext } from "react";
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
} from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../assets/user.png";
import { AppDispatch, RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../features/profile/profileSlice";
import Header from "../components/Header";
import userimg from "../assets/user.png";
import { BiSearchAlt } from "react-icons/bi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
// import Bookmarks from "./components/Bookmarks";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getBookmarks } from "../features/bookmarks/bookmarkSlice";

const RootLayout = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [viewImg, setViewImg] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, status } = useSelector((state: RootState) => state.user);
  // const { status } = useSelector((state: RootState) => state.bookmark);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(profile());
    };

    fetchUser().catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <Header />
      <main className="h-[calc(1 00vh-170px)] pb-5">
        <LoadingOverlay
          visible={status === "pending" && true}
          loader={<Loader variant="bars" />}
          overlayOpacity={1}
        />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </Container>
  );
};

export default RootLayout;
