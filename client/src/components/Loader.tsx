import React from "react";
import { Loader as Loading, LoadingOverlay } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Loader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <LoadingOverlay
      visible={user?.token ? true : false}
      loader={<Loading variant="bars" />}
      overlayOpacity={1}
    />
  );
};

export default Loader;
