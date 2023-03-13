import React, { FormEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Popover,
  Button,
  Text,
  Flex,
  ActionIcon,
  Collapse,
  TextInput,
  Center,
  Modal,
  Avatar as Picture,
  Alert,
  Paper,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import userimg from "../assets/user.png";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";
import { useDisclosure } from "@mantine/hooks";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineCake } from "react-icons/md";
import Avatar from "react-avatar-edit";
import ProfilePicture from "./ProfilePicture";
// import { update } from "../features/auth/authSlice";
import { updateProfile } from "../features/profile/profileSlice";
import { AiOutlineCheck } from "react-icons/ai";
import ToasterNotification from "./ToasterNotification";

interface Props {
  deletePrompt: () => void;
  closePopover: () => void;
}

const ProfilePopover = ({ deletePrompt, closePopover }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [opened, { toggle }] = useDisclosure(false);
  const [picture, pictureHandlers] = useDisclosure(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, isLoading } = useSelector(
    (state: RootState) => state.profile
  );
  const { bookmarks } = useSelector((state: RootState) => state.bookmark);

  const [viewImg, setViewImg] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setViewImg(profile?.image!);
    setName(profile?.name!);
    setEmail(profile?.email!);
  }, []);

  const onCrop = (view: string) => {
    setViewImg(view);
  };

  const onClose = () => {
    setViewImg("");
  };

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const profile = {
      name,
      email,
      image: viewImg,
    };
    dispatch(updateProfile(profile))
      .unwrap()
      .then(() => {
        toggle();
        const message = "Profile updated successfully";
        ToasterNotification(message);
      })
      .catch(() => setError(true));
  };

  const length = bookmarks.map((bm) => bm.links?.length);
  let total = 0;
  length.forEach((item) => (total += item!));

  return (
    <section className="space-y-2">
      {opened ? (
        <form className="w-[210px]" onSubmit={onUpdate}>
          <Flex align="center" gap={10} pb={18}>
            <BiArrowBack
              onClick={toggle}
              className="text-gray-500 hover:text-gray-500 cursor-pointer"
            />
            <Text size="xs">Edit Profile</Text>
          </Flex>
          <Center>
            <Picture
              radius={100}
              size={140}
              src={viewImg || user?.image || userimg}
              onClick={pictureHandlers.open}
            />
          </Center>
          {error && (
            <Alert color="red" mt={18}>
              <Text fz={12} className="text-gray-800">
                Something went wrong. Image is too large
              </Text>
            </Alert>
          )}
          <TextInput
            label="Name"
            value={name!}
            size="xs"
            spellCheck="false"
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            value={email!}
            size="xs"
            spellCheck="false"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Flex justify="end" pt={15}>
            <Button size="xs" color="teal" type="submit" loading={isLoading}>
              Update
            </Button>
          </Flex>
        </form>
      ) : (
        <>
          <Flex align="center" gap={13}>
            <ActionIcon radius="lg" size={45} variant="transparent">
              <img src={profile?.image || userimg} alt="" />
            </ActionIcon>
            <div className="-space-y-[3px]">
              <Text size="sm">{profile?.name}</Text>
              <Text size="sm" c="dimmed" fz="xs">
                {profile?.email}
              </Text>
            </div>
          </Flex>

          <Flex gap={10}>
            <Button onClick={toggle} size="xs" color="gray" variant="light">
              Edit profile
            </Button>
            <Button
              size="xs"
              color="red"
              variant="white"
              onClick={() => {
                deletePrompt();
                closePopover();
              }}
            >
              Delete account
            </Button>
          </Flex>
        </>
      )}

      {!opened && (
        <div>
          <Flex gap={10}>
            <Text c="dimmed" size="xs">
              Bookmarks:
              <span className="text-gray-700"> {bookmarks.length}</span>
            </Text>
            <Text c="dimmed" size="xs">
              Total links:
              <span className="text-gray-700"> {total}</span>
            </Text>
          </Flex>
          <Flex align="center" gap={8}>
            <MdOutlineCake className="text-gray-500" />
            <Text c="dimmed" size="xs" pt={4}>
              Joined on {profile?.day}
            </Text>
          </Flex>
        </div>
      )}
      <Modal
        opened={picture}
        onClose={pictureHandlers.close}
        size="xs"
        centered
        withCloseButton={false}
      >
        <Avatar onClose={onClose} onCrop={onCrop} width="100%" height={295} />
        <Flex justify="flex-end">
          <Button
            size="sm"
            mt={10}
            onClick={() => {
              pictureHandlers.close();
            }}
          >
            Done
          </Button>
        </Flex>
      </Modal>
    </section>
  );
};

export default ProfilePopover;
