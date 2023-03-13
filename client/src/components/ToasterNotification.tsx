import React from "react";
import { Paper, Flex, Text } from "@mantine/core";
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";

const ToasterNotification = (message: string) => {
  return toast(
    <Paper shadow="xs" p="md">
      <Flex gap={10}>
        <div className="bg-green-400 rounded-full p-[5px]">
          <AiOutlineCheck className="text-white text-xs" />
        </div>
        <Text fz="sm" className="text-gray-500">
          {message}
        </Text>
      </Flex>
    </Paper>,
    {
      duration: 2000,
      className: "bg-none shadow-none",
    }
  );
};

export default ToasterNotification;
