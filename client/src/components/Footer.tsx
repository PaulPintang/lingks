import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { Flex, Text } from "@mantine/core";
const Footer = () => {
  return (
    <div className="h-5">
      <Flex justify="space-between" align="center">
        <Text className="text-gray-600 uppercase text-xs font-semibold">
          &copy; 2023 | All right reserved
        </Text>
        <div className="hidden md:flex lg:flex">
          {true ? (
            <MdDarkMode className="text-gray-800 cursor-pointer" />
          ) : (
            <MdLightMode className="text-gray-800 cursor-pointer" />
          )}
        </div>
      </Flex>
    </div>
  );
};

export default Footer;
