import React from "react";
import { RxLink2 } from "react-icons/rx";
import { Flex, Card, Text, Group, Image, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

export interface ModalPropsInterface {
  opened: boolean;
  close: () => void;
}

const Bookmarks = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex gap={20} py="md" className="w-full" wrap="wrap">
      <Link
        to="hello"
        className="no-underline lg:w-[295px] md:w-[295px]  w-full"
      >
        <Card shadow="sm" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://www.sjinnovation.com/sites/default/files/pictures/blog-post/Everything%20to%20Know%20about%20React%20JS%20and%20How%20it%20Works.png"
              height={100}
              alt="React"
            />
          </Card.Section>
          <Card.Section p={13} pb={18}>
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
            <Card
              px={10}
              py={6}
              mt={10}
              withBorder
              radius={10}
              className="cursor-pointer hover:bg-gray-50 transition-all"
            >
              <Text className="text-[12.3px] text-gray-800" fw={600}>
                React Important Hooks
              </Text>
              <Flex className="text-gray-400" align="center" gap={5}>
                <RxLink2 size={14} />
                <Text c="dimmed" fz="xs" className="truncate">
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
              <Text c="dimmed" fz="xs" fs="italic">
                recently added
              </Text>
            </Card>
          </Card.Section>
        </Card>
      </Link>
      <Link
        to="hello"
        className="no-underline lg:w-[295px]  md:w-[295px] w-full"
      >
        <Card shadow="sm" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://assets.toptal.io/images?url=https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1181581/retina_500x200_cover-secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png"
              height={100}
              alt="React"
            />
          </Card.Section>
          <Card.Section p={13} pb={18}>
            <div>
              <Flex justify="space-between" align="center">
                <Text weight={600}>Node&Express.Js</Text>
                <Badge color="yellow" variant="light">
                  Backend
                </Badge>
              </Flex>
              <Text c="dimmed" fz="sm">
                Backend development important links
              </Text>
              <Flex gap={10} align="center" className="text-sm">
                <Text c="dimmed" fw={600}>
                  Bookmarks:
                </Text>
                <Text>4 links</Text>
              </Flex>
            </div>
            <Card
              px={10}
              py={6}
              mt={10}
              withBorder
              radius={10}
              className="cursor-pointer hover:bg-gray-50 transition-all"
            >
              <Text className="text-[12.3px] text-gray-800" fw={600}>
                Authentication
              </Text>
              <Flex className="text-gray-400" align="center" gap={5}>
                <RxLink2 size={14} />
                <Text c="dimmed" fz="xs" className="truncate">
                  https://www.knowledgehut.com/blog/web-development/authentication-method-node
                </Text>
              </Flex>
              <Flex gap={10} align="center" className="text-xs">
                <Text c="dimmed" fw={600}>
                  Date Added:
                </Text>
                <Text className="bg-gray-100 text-gray-800 px-2 rounded-md">
                  March 20, 2023, 5:20 PM
                </Text>
              </Flex>
              <Text c="dimmed" fz="xs" fs="italic">
                recently added
              </Text>
            </Card>
          </Card.Section>
        </Card>
      </Link>

      <Link
        to="hello"
        className="no-underline lg:w-[295px]  md:w-[295px] w-full"
      >
        <Card shadow="sm" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://res.cloudinary.com/hevo/image/upload/c_scale,w_607,h_341/f_auto,q_auto/v1644403814/hevo-learn/springboot_MongoDB_configuration_mongodb.jpg?_i=AA"
              height={100}
              alt="React"
            />
          </Card.Section>
          <Card.Section p={13} pb={18}>
            <div>
              <Flex justify="space-between" align="center">
                <Text weight={600}>MongoDB</Text>
                <Badge color="green" variant="light">
                  Database
                </Badge>
              </Flex>
              <Text c="dimmed" fz="sm">
                No SQL important links, etc
              </Text>
              <Flex gap={10} align="center" className="text-sm">
                <Text c="dimmed" fw={600}>
                  Bookmarks:
                </Text>
                <Text>8 links</Text>
              </Flex>
            </div>
            <Card
              px={10}
              py={6}
              mt={10}
              withBorder
              radius={10}
              className="cursor-pointer hover:bg-gray-50 transition-all"
            >
              <Text className="text-[12.3px] text-gray-800" fw={600}>
                Learning Mongoose
              </Text>
              <Flex className="text-gray-400" align="center" gap={5}>
                <RxLink2 size={14} />
                <Text c="dimmed" fz="xs" className="truncate">
                  https://mongoosejs.com/docs/
                </Text>
              </Flex>
              <Flex gap={10} align="center" className="text-xs">
                <Text c="dimmed" fw={600}>
                  Date Added:
                </Text>
                <Text className="bg-gray-100 text-gray-800 px-2 rounded-md">
                  March 19, 2023, 5: 20 PM
                </Text>
              </Flex>
              <Text c="dimmed" fz="xs" fs="italic">
                recently added
              </Text>
            </Card>
          </Card.Section>
        </Card>
      </Link>
    </Flex>
  );
};

export default Bookmarks;
