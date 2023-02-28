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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/user.png";

const Profile = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [viewImg, setViewImg] = useState<string | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await userLoggedIn(localStorage.getItem("token")!);
  //     setUser(user);
  //     setIsLoading(false);
  //   };

  //   fetchUser().catch((error) => console.log(error));
  //   return () => {
  //     setUser(null);
  //   };
  // }, []);

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
      {/* <LoadingOverlay
        visible={!isLoading}
        loader={<Loader variant="bars" />}
        overlayOpacity={1}
      /> */}
      <Center style={{ width: "100%", height: "100vh" }}>
        <Title order={1}>Hey, this is linkd</Title>
        <Button onClick={handleLogout} size="md">
          Logout
        </Button>
      </Center>
    </Container>
  );
};

export default Profile;
