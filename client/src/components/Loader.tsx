import { Loader as Loading, LoadingOverlay } from "@mantine/core";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const Loader = () => {
  const { status } = useAppSelector((state: RootState) => state.profile);
  return (
    <LoadingOverlay
      visible={status === "pending" && true}
      loader={<Loading variant="bars" />}
      overlayOpacity={1}
    />
  );
};

export default Loader;
