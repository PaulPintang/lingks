import React from "react";
import { Loader as Loading, LoadingOverlay } from "@mantine/core";

const Loader = () => {
  return (
    <LoadingOverlay
      visible={localStorage.getItem("token") ? true : false}
      loader={<Loading variant="bars" />}
      overlayOpacity={1}
    />
  );
};

export default Loader;
