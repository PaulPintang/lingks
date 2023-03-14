import { Loader as Loading, LoadingOverlay } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Loader = () => {
  const { status } = useSelector((state: RootState) => state.profile);
  return (
    <LoadingOverlay
      visible={status == "pending" && true}
      loader={<Loading variant="bars" />}
      overlayOpacity={1}
    />
  );
};

export default Loader;
