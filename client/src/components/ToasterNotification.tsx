import React from "react";
import { Paper, Flex, Text } from "@mantine/core";
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";

const ToasterNotification = (message: string) => {
  return toast(
    <>
      <Flex gap={10}>
        <div className="bg-green-400 rounded-full p-[5px]">
          <AiOutlineCheck className="text-white text-xs rounded-none" />
        </div>
        <Text fz="sm" className="text-gray-500">
          {message}
        </Text>
      </Flex>
    </>,
    {
      duration: 2000,
      className: "bg-white",
      style: {
        padding: 8,
      },
    }
  );
};

export default ToasterNotification;
