import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Grid,
  Card,
  Badge,
  Flex,
  Image,
  Text,
  Input,
  Button,
  ActionIcon,
} from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { RxLink2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import AddLinksModal from "./AddLinksModal";

const BookmarkView = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Grid py="md">
      <Grid.Col className="bg-red- 300" lg={4}>
        <Card className="lg:w-[295px] w-full">
          <Card.Section>
            <Image
              src="https://ckl-website-static.s3.amazonaws.com/wp-content/uploads/2017/07/Banner_css-300x300.png.webp"
              height={100}
              alt="React"
            />
          </Card.Section>
          <Card.Section p={13}>
            <div>
              <Flex justify="space-between" align="center">
                <Text weight={600}>React Js</Text>
                <Badge color="pink" variant="light">
                  Front-end
                </Badge>
              </Flex>
              <Text c="dimmed" fz="sm">
                My important links related to React
              </Text>
              <Flex gap={10} align="center" className="text-sm">
                <Text c="dimmed" fw={600}>
                  Bookmarks:
                </Text>
                <Text>30 links</Text>
              </Flex>
            </div>
          </Card.Section>
        </Card>
      </Grid.Col>
      <Grid.Col lg={8} className="bg-red -500">
        <Flex>
          <Flex align="center" gap={10} className="w-full">
            <Input
              size="sm"
              className="lg:w-[240px] w-full"
              placeholder="Search your bookmark..."
            />
            <Button color="violet" size="sm">
              Search
            </Button>
          </Flex>
          <Button onClick={open} size="sm" className="hidden lg:flex">
            Add link
          </Button>

          <ActionIcon
            onClick={open}
            className="lg:hidden fixed bottom-12 right-4 z-10"
            color="green"
            variant="filled"
            size="lg"
          >
            <AiOutlinePlus />
          </ActionIcon>
        </Flex>
        <Flex className="w-full" wrap="wrap" justify="space-between" gap={5}>
          <Card
            px={10}
            py={6}
            mt={10}
            withBorder
            radius={10}
            className="lg:w-[300px] w-full cursor-pointer hover:bg-gray-100 transition-all"
          >
            <Text className="lg:text-[12.3px] text-sm text-gray-800" fw={600}>
              React Important Hooks
            </Text>
            <Flex className="text-gray-400" align="center" gap={5}>
              <RxLink2 size={14} />
              <Text c="dimmed" fz="xs">
                https://beta.reactjs.org/reference/react
              </Text>
            </Flex>
            <Flex gap={10} align="center" className="text-xs">
              <Text c="dimmed" fw={600}>
                Date Added:
              </Text>
              <Text className="bg-gray-100 text-gray-800 px-2 rounded-md">
                March 05, 2023, 5: 20 PM
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Grid.Col>
      <AddLinksModal opened={opened} close={close} />
    </Grid>
  );
};

export default BookmarkView;
