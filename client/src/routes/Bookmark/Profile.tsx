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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/user.png";
import { AppDispatch, RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../../features/auth/authSlice";
import Header from "../../components/Header";
import userimg from "../../assets/user.png";
import { BiSearchAlt } from "react-icons/bi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Bookmarks from "./components/Bookmarks";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [viewImg, setViewImg] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { status, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(profile(localStorage.getItem("token")!));
    };

    fetchUser().catch((error) => console.log(error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // const onCrop = (view: any) => {
  //   setViewImg(view);
  // };

  // const onClose = () => {
  //   setViewImg(null);
  //   setError(false);
  // };

  // const handleUpload = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setProcessing(true);
  //   try {
  //     const res = await axios.put("/api/user/upload", {
  //       image: viewImg,
  //       _id: user!._id,
  //     });
  //     const updatedUser = await userLoggedIn(localStorage.getItem("token")!);
  //     setUser(updatedUser);
  //     res && setProcessing(false);
  //     res && setOpened(false);
  //   } catch (error) {
  //     console.log(error);
  //     setProcessing(false);
  //     setError(true);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     const res = await axios.delete(`api/user/me/${user?._id}`, {
  //       headers: {
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //     });
  //     // res && handleLogout();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container>
      <LoadingOverlay
        visible={status !== "succeeded" && true}
        loader={<Loader variant="bars" />}
        overlayOpacity={1}
      />
      <Header />
      <Title order={1}>Your bookmarks</Title>
      <Grid className="h-[calc(100vh-170px)]" gutter={2}>
        <Grid.Col span={12} className="bg-red -50 py-4">
          {/* <Flex align="center" gap={10}>
            <Input
              size="sm"
              className="w-[240px]"
              placeholder="Search your bookmark..."
            />
            <Button leftIcon={<BiSearchAlt size="1rem" />} size="sm">
              Search
            </Button>
          </Flex> */}
          <Outlet />
        </Grid.Col>
        {/* <Grid.Col span={3} className="bg-gr en-50">
          <Title order={5} className="text-gray-700">
            Discover profiles
          </Title>
          <div>
            <div className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-all rounded-md">
              <Flex align="center" gap={12}>
                <div className="w-9">
                  <img src={userimg} alt="" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <p className="dark:text-gray-400">Juan Dela Cruz</p>
                  <p className="text-gray-500 text-xs bg-gray-00 rounded">
                    <span className="font-semibold text-gray-600">22</span>{" "}
                    bookmarks
                  </p>
                </div>
              </Flex>
            </div>
            <div className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-all rounded-md">
              <Flex align="center" gap={12}>
                <div className="w-9">
                  <img src={userimg} alt="" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <p className="dark:text-gray-400">Maureen Biologis</p>
                  <p className="text-gray-500 text-xs bg-gray-00 rounded">
                    <span className="font-semibold text-gray-600">9</span>{" "}
                    bookmarks
                  </p>
                </div>
              </Flex>
            </div>
            <div className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-all rounded-md">
              <Flex align="center" gap={12}>
                <div className="w-9">
                  <img src={userimg} alt="" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <p className="dark:text-gray-400">Teri Dacty</p>
                  <p className="text-gray-500 text-xs bg-gray-00 rounded">
                    <span className="font-semibold text-gray-600">4</span>{" "}
                    bookmarks
                  </p>
                </div>
              </Flex>
            </div>
            <div className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-all rounded-md">
              <Flex align="center" gap={12}>
                <div className="w-9">
                  <img src={userimg} alt="" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <p className="dark:text-gray-400">Patty O'Furniture</p>
                  <p className="text-gray-500 text-xs bg-gray-00 rounded">
                    <span className="font-semibold text-gray-600">12</span>{" "}
                    bookmarks
                  </p>
                </div>
              </Flex>
            </div>
            <div className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer transition-all rounded-md">
              <Flex align="center" gap={12}>
                <div className="w-9">
                  <img src={userimg} alt="" className="w-full" />
                </div>
                <div className="flex flex-col">
                  <p className="dark:text-gray-400">Olive Yew</p>
                  <p className="text-gray-500 text-xs bg-gray-00 rounded">
                    <span className="font-semibold text-gray-600">20</span>{" "}
                    bookmarks
                  </p>
                </div>
              </Flex>
            </div>
          </div>
        </Grid.Col> */}
      </Grid>
      <div className="h-5">
        <Flex justify="space-between" align="center">
          <Text className="text-gray-600 uppercase text-xs font-semibold">
            &copy; 2023 | All right reserved
          </Text>
          {true ? (
            <MdDarkMode className="text-gray-800 cursor-pointer" />
          ) : (
            <MdLightMode className="text-gray-800 cursor-pointer" />
          )}
        </Flex>
      </div>
    </Container>
  );
};

export default Profile;
