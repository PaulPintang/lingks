import { RiGithubFill } from "react-icons/ri";
import { Anchor, Container } from "@mantine/core";

import { Flex, Text } from "@mantine/core";
const Footer = () => {
  return (
    <Container className="py-3 relative z-10">
      <Flex justify="space-between" align="center">
        <Flex className="text-gray-500  text-sm font-semibold" gap={2}>
          <Text>
            &copy; 2023 | Lingks crafted by{" "}
            <Anchor href="https://paulpintang.com/" target="_blank">
              PaulPintang
            </Anchor>
          </Text>
        </Flex>
        <div className="flex">
          <Anchor href="https://github.com/PaulPintang/lingks" target="_blank">
            <RiGithubFill className="text-gray-800 cursor-pointer" size={20} />
          </Anchor>
        </div>
      </Flex>
    </Container>
  );
};

export default Footer;
