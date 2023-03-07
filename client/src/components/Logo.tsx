import { Flex, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { RxLink2 } from "react-icons/rx";

const Logo = () => {
  return (
    <Flex align="center" justify="center" gap={10}>
      <RxLink2 size={25} className="text-blue-500" />
      <Title className="text-[26px]">
        <Link to="/" className="text-inherit no-underline">
          <span className="">linkd.io</span>
        </Link>
      </Title>
    </Flex>
  );
};

export default Logo;
