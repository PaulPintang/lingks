import { Loader as Loading, LoadingOverlay } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Loader = () => {
  const { fetching } = useSelector((state: RootState) => state.bookmark);
  return (
    <LoadingOverlay
      visible={fetching == "pending" && true}
      loader={<Loading variant="bars" />}
      overlayOpacity={1}
    />
  );
};

export default Loader;
